const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userModel = require('../../Model/userModel');



async function userSignInController(req, res, next) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    try {
console.log("userId===>", user);
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({
                success: true,
                message: 'Sign-in successful',
                token: token,
                success: true,
                error: false
            });
        } else {
            // Passwords don't match
            res.status(401).json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

}


module.exports = userSignInController