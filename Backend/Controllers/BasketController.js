import { Consumer } from '../models/Consumer.js';
import { Product } from '../models/Product.js';

export const getBasket = async (req, res) => {
  try {
    const { consumerId } = req.params; 

    const consumer = await Consumer.findById(consumerId)
      .populate({
        path: 'basket.product', 
        select: '-__v' 
      });

    if (!consumer) {
      return res.status(404).json({
        success: false,
        error: 'Consumer not found'
      });
    }

    res.json({
      success: true,
      data: consumer.basket
    });
  } catch (err) {
    console.error("Error in getBasket:", err); 
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const addToBasket = async (req, res) => {
  try {
    const { consumerId, productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    
    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      return res.status(404).json({
        success: false,
        error: 'Consumer not found'
      });
    }

    
    const existingItemIndex = consumer.basket.findIndex(
      item => item.product._id.toString() === productId
    );

    if (existingItemIndex > -1) {
      consumer.basket[existingItemIndex].quantity += quantity;
    } else {
      consumer.basket.push({
        product: product.toObject(),
        quantity
      });
    }

    await consumer.save();

    res.status(201).json({
      success: true,
      data: consumer.basket
    });
  } catch (err) {
    console.error("Error in addToBasket:", err); 
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const deleteFromBasket = async (req, res) => {
  try {
    const { consumerId, productId } = req.params; 

    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      return res.status(404).json({
        success: false,
        error: 'Consumer not found'
      });
    }

    const productIndex = consumer.basket.findIndex(
      item => item.product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found in basket'
      });
    }

    
    consumer.basket.splice(productIndex, 1);

    
    await consumer.save();

    res.json({
      success: true,
      message: 'Product removed from basket',
      data: consumer.basket
    });
  } catch (err) {
    console.error("Error in deleteFromBasket:", err); 
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};