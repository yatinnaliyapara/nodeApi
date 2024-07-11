const userModel = require("../../Model/userModel")
const addToCartModel = require('../../Model/cartProduct'); // Assuming this is correctly imported

const countAddToCartProduct = async (req, res) => {
    try {
        console.log("countAddToCartProduct userId", req.user._id)
        const user = await userModel.findById(req.user._id)

        console.log("userId ===>", user);
        // Count documents in addToCartModel where userId matches
        const count = await addToCartModel.countDocuments({
            userId: user // Assuming userId._id is the correct field to match
        });

        // Return count in the response
        res.status(200).json({
            success: true,
            data: {
                count: count
            },
            message: 'Successfully counted cart products',
            error: false
        });

    } catch (error) {
        console.error('Error counting cart products:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = countAddToCartProduct;
