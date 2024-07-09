const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userModel = require('../../Model/userModel');




async function userSignInController(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        console.log("checkPassoword", checkPassword)

        if (checkPassword) {
            const tokenData = {
                _id: user.id,
                email: user.email,
            }
            console.log("process.env.TOKEN_SECRET_KEY", process.env.TOKEN_SECRET_KEY);
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true,
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })
        } else {
            throw new Error("Please check Password")
        }


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController