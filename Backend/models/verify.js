import mongoose from "mongoose";


// details verification ki or sath me productid mil jayegi so we can target 

const verifySchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    productCertificate: { type: String },
    otherDetails: { type: String }
});

export const Verify = mongoose.model("Verify", verifySchema);