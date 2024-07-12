const getProductController = require('../controllers/product/getProduct');
const UploadProductController = require('../controllers/product/uploadProduct');
const addToCartController = require('../controllers/user/addToCartController');
const allUsers = require('../controllers/user/allUser');
const countAddToCartProduct = require('../controllers/user/countAddToCartProduct');
const userDetailsController = require('../controllers/user/userDetails');
const userLogout = require('../controllers/user/userLogout');
const userSignInController = require('../controllers/user/userSignIn');
const userSignUpController = require('../controllers/user/userSignUp');
const authToken = require('../middleware/authToken');

const router = require('express').Router();


router.get("/all-user", authToken, allUsers)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)
router.get("/countAddToCartProduct", authToken,countAddToCartProduct )
router.get("/get-product", getProductController )


router.post("/signin", userSignInController)
router.post("/signup", userSignUpController)
router.post("/upload-product",authToken, UploadProductController)
router.post("/addtocart", authToken, addToCartController)
module.exports = router