import { Farmer } from '../models/Farmer.js';


export const registerFarmer = async (req, res) => {
  try {
    const { farmerEmail } = req.body;

    const existingFarmer = await Farmer.findOne({ farmerEmail });
    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this email already exists'
      });
    }

    if(farmerEmail){
      const farmer = new Farmer({
        farmerEmail,
        profileSetup:true
      });
  
      await farmer.save();
  
      res.status(201).json(farmer);
    }
    else{
      res.status(400).json({
        success: false,
        message: 'Farmer email is required'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering farmer',
      error: error.message
    });
  }
};


export const getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.json({
      success: true,
      data: farmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farmer',
      error: error.message
    });
  }
};

export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({});

    res.json(farmers);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farmers',
      error: error.message
    });
  }
};