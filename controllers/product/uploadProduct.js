const productModel = require("../../Model/productModel")
const uploadProductPermission = require("../../helpers/permission")


async function UploadProductController(req, res, next) {

    try {
        const sessionUserId = req.user._id
console.log("sessionUserId product ==>",sessionUserId);
        
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
console.log("saveProduct product ==>",saveProduct);
        console.log('Uploading product ==>',uploadProduct);
        res.status(200).json({
            message : "Product uploaded successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }


}
module.exports = UploadProductController