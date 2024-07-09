const userModel = require("../../Model/userModel");



async function allUsers(req, res, next) {
    try {
        console.log("userid all Users", req)

        const allUsers = await userModel.find()
        console.log('allUsers', allUsers);

        res.json({
            message: "All User ",
            data: allUsers,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = allUsers