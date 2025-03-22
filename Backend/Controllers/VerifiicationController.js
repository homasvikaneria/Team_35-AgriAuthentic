import { Verify } from '../models/verify.js';


export const createVerification = async (req, res) => {
  try {
    const { product_id, productCertificate, otherDetils } = req.body;

    const verification = new Verify({
      product_id,
      productCertificate,
      otherDetils
    });

    await verification.save();

    res.status(201).json({
      success: true,
      message: 'Verification created successfully',
      data: verification
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


export const getVerificationById = async (req, res) => {
  try {
    const verification = await Verify.findById(req.params.id)
      .populate('product_id', 'productName productDescription'); 

    if (!verification) {
      return res.status(404).json({
        success: false,
        error: 'Verification not found'
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

export const deleteVerification = async (req, res) => {
  try {
    const verification = await Verify.findByIdAndDelete(req.params.id);

    if (!verification) {
      return res.status(404).json({
        success: false,
        error: 'Verification not found'
      });
    }

    res.json({
      success: true,
      message: 'Verification deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};