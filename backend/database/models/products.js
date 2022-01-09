const mongoose = require("mongoose");

const products = new.mongoose.Schema({
    name: {type:String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number},
    views: {type: Number},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true }
    
})
module.exports = mongoose.model("Products", products)