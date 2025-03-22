import mongoose from "mongoose";

// basic farmer ki details as per the phone email and address


const farmerSchema = mongoose.Schema({
    farmerEmail: { type: String },
    farmerPhone: { type: Number },
    farmAddress: [{
        address: { type: String },
        city: { type: String },
        state: { type: String },
        zipcode: { type: Number },
        country: { type: String }
    }],

// expra details add ki hai farmers ki to make consumer more satisfied

    farmSize: { type: Number },
    primaryCrops: [{ type: String }],
    profileSetup: {
        type: Boolean,
        default: false
    }
});

export const Farmer = mongoose.model("Farmer", farmerSchema);