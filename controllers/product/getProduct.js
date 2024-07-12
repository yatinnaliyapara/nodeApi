const productModel = require("../../Model/productModel")


const getProductController = async (req, res) => {

    try {

        const allProduct = await productModel.find().sort({ createdAt: -1 })

        console.log("allProduct ===>", allProduct);
        res.status(200).json({
            message: 'All Products have been created',
            success: true,
            error: false,
            data: allProduct
        })
    } catch (err) {
        console.error('Error :', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

}

module.exports = getProductController