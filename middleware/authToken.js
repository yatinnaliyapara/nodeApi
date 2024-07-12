const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        console.log("Cookies: ", req.cookies);
        console.log("Cookies: ", req.headers.authorization.split(" ")[1]);  // Debug log
          // Debug log
        const token = req.headers.authorization.split(" ")[1];  // Make sure cookie-parser is used
        console.log("TOKEN", token);
        if (!token) {
            return res.status(200).json({
                message: 'Invalid token',
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log("error auth", err);
                return res.status(401).json({
                    message: 'Unauthorized',
                    error: true,
                    success: false
                });
            }
            req.user = decoded;
            next();
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
