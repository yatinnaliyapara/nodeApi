const bcrypt = require('bcryptjs')
const userModel = require('../../Model/userModel')


async function userSignUpController (req, res, next) {
    try{
        const {email, password, name} = req.body

        const user = await userModel.findOne({email})

        console.log("User useSignUpController", user);

        if(user){
            throw new Error("Email already exist")
        }

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        if (!name) {
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        if (!hashedPassword) {
            throw new Error("Please provide")
        }

        const payload = {
            ...req.body,
            role :'GENERAL',
            password: hashedPassword
        }

        const newUser = await userModel(payload)
        const saveUser = await newUser.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })

    }catch (err) {
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = userSignUpController