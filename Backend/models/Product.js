import mongoose from "mongoose";

// konse farmer ka product hai 

const productSchema = mongoose.Schema({
    farmer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer"
    },

// konsi verification pass by that farmer

    verification_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Verify"
    },

    // basic information product ke bare me that is must 

    productName: { type: String },
    productDescription: { type: String },
    productPrice: { type: String },
    stock: { type: Number },
    imageLink: { type: String },
    tags: [{ type: String }]
});

export const Product = mongoose.model("Product", productSchema);