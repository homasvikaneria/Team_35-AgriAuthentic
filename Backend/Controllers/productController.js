import { Product } from '../models/Product.js';
import { Verify } from '../models/verify.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('farmer_id', 'name email')
      .populate('verification_id');

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmer_id', 'name farmAddress')
      .populate('verification_id');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};




export const getVerificationDetails = async (req, res) => {
  try {
    const verification = await Verify.findOne({ product_id: req.params.id });

    if (!verification) {
      return res.status(404).json({
        success: false,
        error: 'Verification details not found'
      });
    }

    res.json({
      success: true,
      data: verification
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};



export const createProduct = async (req, res) => {
  try {
    const { farmer_id, verification_id, productName, productDescription, productPrice, stock , tags} = req.body;
    const product = new Product({
      farmer_id,
      verification_id,
      productName,
      productDescription,
      productPrice,
      stock,
      tags
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};



export const getProductsByFarmerId = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const products = await Product.find({ farmer_id: farmerId });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this farmer'
      });
    }
    res.json({
      success: true,
      data: products
    });
  } catch (err) {
    console.error("Error in getProductsByFarmerId:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message
    });
  }
};