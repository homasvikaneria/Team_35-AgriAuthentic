import {Consumer} from '../models/Consumer.js';
import {Order} from '../models/Order.js';


export const getConsumerProfile = async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.user.id)
      .select('-basket -orders -createdAt -updatedAt -__v');

    if (!consumer) {
      return res.status(404).json({
        success: false,
        message: 'Consumer profile not found'
      });
    }
    res.json({
      success: true,
      data: consumer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};


export const addAddress = async (req, res) => {
  try {
    const { consumerId, street, city, state, zipCode, country, isDefault } = req.body;

    const newAddress = {
      street,
      city,
      state,
      zipCode,
      country: country || 'India', 
      isDefault: isDefault || false 
    };

    const consumer = await Consumer.findById(consumerId);

    if (!consumer) {
      return res.status(404).json({
        success: false,
        message: 'Consumer not found'
      });
    }

    if (!consumer.addresses) {
      consumer.addresses = [];
    }

    
    if (newAddress.isDefault) {
      consumer.addresses = consumer.addresses.map(address => ({
        ...address.toObject(),
        isDefault: false
      }));
    }

    
    consumer.addresses.push(newAddress);
    await consumer.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: consumer.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding address',
      error: error.message
    });
  }
};

export const getConsumerOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = { consumer: req.user.id };
    
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('items.product', 'name price images')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(filter);

    res.json({
      success: true,
      count: orders.length,
      total: count,
      data: orders,
      pagination: {
        currentPage: +page,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};


export const registerConsumer = async (req, res) => {
  try {
    const { consumerName, consumerEmail, consumerPhone, consumerAddress } = req.body;

    const existingConsumer = await Consumer.findOne({ consumerEmail });
    if (existingConsumer) {
      return res.status(400).json({
        success: false,
        message: 'Consumer with this email already exists'
      });
    }

    const consumer = new Consumer({
      consumerName,
      consumerEmail,
      consumerPhone,
      consumerAddress
    });

    await consumer.save();

    res.status(201).json({
      success: true,
      message: 'Consumer registered successfully',
      data: consumer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering consumer',
      error: error.message
    });
  }
};