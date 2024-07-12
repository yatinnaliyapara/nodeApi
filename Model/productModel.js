const mongoose = require('mongoose')

const productItem = mongoose.Schema({
    productName: String,
    brandName: String,
    categoryName: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number
}, {
    timestamps: true
})

const productModel = mongoose.model("product", productItem)

module.exports = productModel