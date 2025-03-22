import mongoose from "mongoose";

const marketSchema = new mongoose.Schema({
    State: String,
    District: String,
    Market: String,
    Commodity: String,
    Variety: String,
    Grade: String,
    Arrival_Date: { type: Date },
    Min_x0020_Price: Number,
    Max_x0020_Price: Number,
    Modal_x0020_Price: Number
});

const MarketPrice = mongoose.model("MarketPrice", marketSchema);

export default MarketPrice;
