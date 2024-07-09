const allUsers = require('../controllers/user/allUser');
const userDetailsController = require('../controllers/user/userDetails');
const userLogout = require('../controllers/user/userLogout');
const userSignInController = require('../controllers/user/userSignIn');
const userSignUpController = require('../controllers/user/userSignUp');
const authToken = require('../middleware/authToken');

const router = require('express').Router();


router.get("/all-user", authToken, allUsers)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)


router.post("/signin", userSignInController)
router.post("/signup", userSignUpController)
module.exports = router