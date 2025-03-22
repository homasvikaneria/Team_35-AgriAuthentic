import { Order } from '../models/Order.js';
import { Consumer } from '../models/Consumer.js';
import { Product } from '../models/Product.js';
import mongoose from "mongoose";





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

