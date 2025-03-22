import { Order } from '../models/Order.js';
import { Consumer } from '../models/Consumer.js';
import { Product } from '../models/Product.js';
import mongoose from "mongoose";
import Stripe from 'stripe';
import dotenv from 'dotenv';


dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const createOrderFromBasket = async (req, res) => {
  try {
    const { consumerId } = req.body;

    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    consumer.basket = consumer.basket.filter(item => item.product !== null);
    if (consumer.basket.length === 0) {
      return res.status(400).json({ success: false, message: 'Your basket is empty' });
    }

    let totalAmount = 0;
    const orderedProducts = [];
    const line_items = [];

    for (const basketItem of consumer.basket) {
      const product = await Product.findById(basketItem.product._id);
      if (!product) {
        return res.status(400).json({ 
          success: false, 
          message: `Product ${basketItem.product.productName} no longer available` 
        });
      }

      const price = parseFloat(product.productPrice);
      totalAmount += price * basketItem.quantity;

      orderedProducts.push({
        item: basketItem.product,
        quantity: basketItem.quantity,
      });

      line_items.push({
        price_data: {
          currency: 'inr',
          unit_amount: price * 100, 
          product_data: {
            name: product.productName,
            description: product.description,
            images: [product.imageURL],
          },
        },        
        quantity: basketItem.quantity,
      });
    }


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/cart`,
      customer_email: consumer.email,
      client_reference_id: consumerId,
      line_items,
    });

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      message: 'Stripe checkout session created successfully.',
    });

  } catch (error) {
    console.error("Error in createOrderFromBasket:", error);


    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: 'Order creation failed', error: error.message });
    }
  }
};

export const getConsumerOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, consumerId } = req.query; 

    if (!consumerId) {
      return res.status(400).json({
        success: false,
        message: 'Consumer ID is required'
      });
    }

    const orders = await Order.find({ consumer: consumerId })
      .select('-__v -updatedAt')
      .populate('items.product', 'name images')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments({ consumer: consumerId });

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: +page,
        totalPages: Math.ceil(count / limit),
        totalOrders: count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};


export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

  
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error("Error in getOrderDetails:", error); 
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
};


export const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      consumer: req.user.id
    }).select('status deliveryUpdates estimatedDelivery');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: {
        status: order.status,
        lastUpdate: order.deliveryUpdates.slice(-1)[0],
        estimatedDelivery: order.estimatedDelivery
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order status',
      error: error.message
    });
  }
};



export const getOrdersByFarmerId = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const farmerObjectId = new mongoose.Types.ObjectId(farmerId);

    const orders = await Order.find({
      "orderDetail.orderedProducts.item.farmer_id": farmerObjectId,
    })
      .populate("consumer_id", "consumerName") 
      .populate("orderDetail.orderedProducts.item"); 

    console.log("Orders found:", orders);

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this farmer",
      });
    }

    const formattedOrders = orders.map((order) => {
      const filteredProducts = order.orderDetail.orderedProducts.filter(
        (product) =>
          product.item &&
          product.item.farmer_id.toString() === farmerId
      );

      return {
        _id: order._id,
        consumer: {
          id: order.consumer_id._id,
          name: order.consumer_id.consumerName,
        },
        consumer_address: order.consumer_address,
        orderDetail: {
          orderTime: order.orderDetail.orderTime,
          expectedDelivery: order.orderDetail.expectedDelivery,
          deliveryStatus: order.orderDetail.deliveryStatus,
          orderedProducts: filteredProducts,
        },
        orderAmount: order.orderAmount,
      };
    });

    res.json({
      success: true,
      data: formattedOrders,
    });
  } catch (err) {
    console.error("Error in getOrdersByFarmerId:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};


export const getOrdersByConsumerId = async (req, res) => {
  try {
    const { consumerId } = req.params; 

    console.log("Fetching orders for consumerId:", consumerId); 

   
    const orders = await Order.find({ consumer_id: consumerId })
      .populate({
        path: 'orderDetail.orderedProducts.item', 
        select: 'name price stock' 
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this consumer'
      });
    }
    res.json({
      success: true,
      data: orders
    });
  } catch (err) {
    console.error("Error in getOrdersByConsumerId:", err); 
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: err.message
    });
  }
};

export const confirmOrder = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ success: false, message: "Session ID is required" });
        }

       
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session || session.payment_status !== "paid") {
            return res.status(400).json({ success: false, message: "Payment not successful" });
        }

        const consumerId = session.client_reference_id;

        const consumer = await Consumer.findById(consumerId).populate("basket.product");

        if (!consumer) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!consumer.basket || consumer.basket.length === 0) {
            return res.status(400).json({ success: false, message: "No products in basket" });
        }

     
        let defaultAddress = consumer.addresses.find(addr => addr.isDefault);
        if (!defaultAddress) {
            defaultAddress = {
                street: "Default Street",
                city: "Default City",
                state: "Default State",
                zipCode: 123456,
                country: "India"
            };
        }


        const orderedProductsMap = new Map();

        consumer.basket.forEach((basketItem) => {
            const productId = basketItem.product._id.toString(); 

            if (orderedProductsMap.has(productId)) {
               
                orderedProductsMap.get(productId).quantity += basketItem.quantity;
            } else {
               
                orderedProductsMap.set(productId, {
                    item: basketItem.product, 
                    quantity: basketItem.quantity,
                    farmer_id: basketItem.product?.farmer_id || null,
                });
            }
        });


        const orderedProducts = Array.from(orderedProductsMap.values());


        const newOrder = new Order({
            consumer_id: consumer._id,
            consumer_address: defaultAddress, 
            orderDetail: {
                orderTime: new Date().toISOString(),
                expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
                deliveryStatus: "Processing",
                orderedProducts: orderedProducts, 
                orderAmount: session.amount_total / 100,
            }
        });

        await newOrder.save();

      
        consumer.basket = [];
        await consumer.save();

        res.status(200).json({ success: true, message: "Order confirmed and saved!", order: newOrder });

    } catch (error) {
        console.error("Error in confirmOrder:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
