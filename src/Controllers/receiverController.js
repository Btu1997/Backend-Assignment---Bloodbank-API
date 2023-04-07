const receiverModel = require("../Models/receiverModel")
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { isValid, isValidName, isvalidEmail, isvalidMobile, isValidPassword,  keyValid, validString } = require('../Validator/validation');


const createReceiver = async function (req, res) {
    try {
        const data = req.body
        const { name, email, password, phone, blood_group, address } = data;


        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is mandatory and should have non empty String" })

        if (!isValidName.test(name)) return res.status(400).send({ status: false, message: "Please Provide name in valid formate and Should Starts with Capital Letter" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is mandatory and should have non empty String" })

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "email should be in  valid Formate" })

        if (await receiverModel.findOne({ email })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })
        
        if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is mandatory and should have non empty String" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15" })
        
        const encyptPassword = await bcrypt.hash(password, 10);

        if (!isValid(phone)) return res.status(400).send({ status: false, message: "Phone is mandatory and should have non empty Number" })

        if (!isvalidMobile.test(phone)) return res.status(400).send({ status: false, message: "please provide Valid phone Number with 10 digits starts with 6||7||8||9" })

        if (await receiverModel.findOne({ phone })) return res.status(400).send({ status: false, message: "This Phone is already Registered Please give another Phone" })

        if(!blood_group) return res.status(400).send({status: false, msg: "blood_group is required please enter blood groop"})
        

        if (!isValid(address)) return res.status(400).send({ status: false, message: "Address is mandatory" })

        
        
        let obj = {
            name, email, password: encyptPassword,phone ,blood_group,address }

        const newReceiver= await receiverModel.create(obj)

        return res.status(201).send({ status: true, message: "created successfully", data: newReceiver })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
//////////////////////////////login//////////////////////////////////////////////////////

const loginReceiver = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        //=====================Checking the validation=====================//
        if (!keyValid(data)) return res.status(400).send({ status: false, msg: "Email and Password Required !" })

        //=====================Validation of EmailID=====================//
        if (!email) return res.status(400).send({ status: false, msg: "email is required" })
        //=====================Validation of Password=====================//
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })
       //===================== Checking User exsistance using Email and password=====================//
        const receiver = await receiverModel.findOne({ email: email })
        if (!receiver) return res.status(400).send({ status: false, msg: "Email is Invalid Please try again !!" })
        const verifyPassword = await bcrypt.compare(password, receiver.password)
       if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })
   //===================== Creating Token Using JWT =====================//
        const token = jwt.sign({
            receiverId : receiver._id.toString()
             }, 
        "this is a private key", { expiresIn: '1d' })

        res.setHeader("x-api-key", token)
        res.status(200).send({ status: true, message: "login successfull", data: token })
    }
     catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = {createReceiver,loginReceiver}