import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    consumer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consumer"
    },
    consumer_address: {
        type: String,
        required: true,
    },
    orderDetail: {
        orderTime: { type: String },
        expectedDelivery: { type: String },
        deliveryStatus: { type: String, enum: ["Delivered", "Processing", "Shipped"] },
        orderedProducts: [
            {
                item: {
                    type: mongoose.Schema.Types.Mixed,
                    ref: "Product"
                },
                quantity: { type: Number, required: true },
                farmer_id: {
                    type: mongoose.Schema.Types.Mixed,
                    ref: "Product"
                },
            }
        ],
        orderAmount: { type: Number }
    }
});

export const Order = mongoose.model("Orders", orderSchema);
