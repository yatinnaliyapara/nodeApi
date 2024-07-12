const addToCartModel = require("../../Model/cartProduct")

const addToCartController = async (req, res) => {

    try {
        const { productId } = req.user._id
        console.log('productId ==>', req.user._id);
        const currentUserId = req.user._id

        console.log('currentUserId', currentUserId);

        const isProductAvailable = await addToCartModel.findOne({ productId })
        console.log("product addToCartController", isProductAvailable);
        if (isProductAvailable) {
            return res.json({
                message: "Already exits in Add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUserId,
        }

        console.log("payload ==>",payload );
return
        const newAddProduct = new addToCartModel(payload)
        console.log('newAddProduct', newAddProduct)
        const savedProduct = new newAddProduct.save()

        res.status(200).json({
            data: savedProduct,
            message: "Product Added in Cart",
            success: true,
            error: false
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: 'Internal server error'
        })
    }

}

module.exports = addToCartController