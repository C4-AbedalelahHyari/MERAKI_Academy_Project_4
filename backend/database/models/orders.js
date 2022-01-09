const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    
    
})
module.exports = mongoose.model("Order", ordersSchema)