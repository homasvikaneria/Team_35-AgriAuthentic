import mongoose from "mongoose";

// *** basic details consumer ki ***

const consumerSchema = mongoose.Schema({
    consumerName: { type: String },
    consumerEmail: { type: String },
    consumerPhone: { type: Number },
    addresses: [
        {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: Number },
            country: { type: String, default: 'India' },
            isDefault: { type: Boolean, default: false }
        }
    ],


    // *** order isme save hojayege as per there id ***


    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ],


    // *** basket me  pura ka pura product save ho jayega as per there product ***


    basket: [
        {
            product: { type: mongoose.Schema.Types.Mixed, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ]
});

export const Consumer = mongoose.model("Consumer", consumerSchema);