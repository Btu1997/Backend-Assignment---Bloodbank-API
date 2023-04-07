const hospitalModel = require("../Models/hospitalModel")
const bloodRequestModel = require('../Models/bloodrequestModel');
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { isValid, isValidName, isvalidEmail, isvalidMobile, isValidPassword, pincodeValid, keyValid, validString } = require('../Validator/validation');
const { isValidObjectId } = require("mongoose");

const createHospital = async function (req, res) {
    try {
        const data = req.body
        const { name, email, password, phone, address } = data;


        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is mandatory and should have non empty String" })

        if (!isValidName.test(name)) return res.status(400).send({ status: false, message: "Please Provide name in valid formate and Should Starts with Capital Letter" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is mandatory and should have non empty String" })

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "email should be in  valid Formate" })

        if (await hospitalModel.findOne({ email })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })

        if (!isValid(phone)) return res.status(400).send({ status: false, message: "Phone is mandatory and should have non empty Number" })

        if (!isvalidMobile.test(phone)) return res.status(400).send({ status: false, message: "please provide Valid phone Number with 10 digits starts with 6||7||8||9" })

        if (await hospitalModel.findOne({ phone })) return res.status(400).send({ status: false, message: "This Phone is already Registered Please give another Phone" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is mandatory and should have non empty String" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15" })

        if (!isValid(address)) return res.status(400).send({ status: false, message: "Address is mandatory" })

        const encyptPassword = await bcrypt.hash(password, 10);

        let obj = {
            name, email, password: encyptPassword,phone ,address }

        const newHospital = await hospitalModel.create(obj)

        return res.status(201).send({ status: true, message: "created successfully", data: newHospital })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
///////////////////////////////////////////////////////////////Login//////////////////////////////////////////

const loginHospital = async function (req, res) {
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
        const hospitalUser = await hospitalModel.findOne({ email: email })
        if (!hospitalUser) return res.status(400).send({ status: false, msg: "Email is Invalid Please try again !!" })
        const verifyPassword = await bcrypt.compare(password, hospitalUser.password)
       if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })
   //===================== Creating Token Using JWT =====================//
        const token = jwt.sign({
            hospitalUserId : hospitalUser._id.toString()
             }, 
        "this is a private key", { expiresIn: '1d' })

        res.setHeader("x-api-key", token)
        res.status(200).send({ status: true, message: "login successfull", data: token })
    }
     catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//////////////////////////////////get receiver details who is requested for blood/////////////////////////////////////



// Route to retrieve blood request by blood group
const getReceiverDetails =  async function (req, res)  {
  try {
    const bloodGroup = req.params.bloodGroup;
    const decodedToken = req.decodedToken;
    const hospital_id= req.body.hospital_id;
    if(!hospital_id)return res.status(400).send({status:false, message: "hospital Id required"})
   if(!isValidObjectId(hospital_id))return res.status(400).send({status:false, message: "hospital Id not valid"})

   if (hospital_id != decodedToken.hospitalUserId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })
    const bloodRequests = await bloodRequestModel.find({ blood_group:bloodGroup }).populate("receiver_id","name email phone blood_group address"); // Find all blood requests with matching blood group
 
   return res.status(200).send({ status: true, message: "Success", bloodRequests })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}

}

module.exports = {createHospital,loginHospital,getReceiverDetails};