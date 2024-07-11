const userModel = require("../../Model/userModel")

async function userDetailsController(req, res, next) {
    try {
        console.log("userId", req.user._id)
        const user = await userModel.findById(req.user._id)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User Details"
        })

        console.log("User Details", user);
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = userDetailsController