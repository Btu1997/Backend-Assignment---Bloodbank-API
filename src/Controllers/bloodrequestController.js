const bloodrequestModel= require("../Models/bloodrequestModel");
const receiverModel = require("../Models/receiverModel");
const bloodsampleModel= require("../Models/bloodsampleModel")
const {isValidObjectId}= require("mongoose")


 const createBloodRequest =  async function (req, res){
    try {
    const { receiver_id, hospital_id, blood_group} = req.body;
    const decodedToken = req.decodedToken;

    if(!receiver_id)return res.status(400).send({ status: false, message: "Receiver Id is mandatory and should have non empty String" })
    if(!isValidObjectId(receiver_id))return res.status(400).send({ status: false, message: "Receiver Id not valid" })
   
    if(!hospital_id)return res.status(400).send({ status: false, message: "Hospital Id is mandatory and should have non empty String" })
    if(!isValidObjectId(hospital_id))return res.status(400).send({ status: false, message: "Hospital Id not valid" })
    if(!blood_group) return res.status(400).send({status:false,message:"Blood Groop is required"})

    if (receiver_id !== decodedToken.receiverId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })

   
    // Check if the receiver is eligible for the blood sample
    const bloodSample = await bloodsampleModel.findOne({ hospital_id, blood_group, is_available: true });
    if (!bloodSample ) {
      return res.status(400).json({ message: 'Blood sample not available ' });
    }
    const receiver = await receiverModel.findById(receiver_id);
    // 
    const avialableBloodGroup=  receiver.blood_group[0]//.toString()
    if (!receiver || avialableBloodGroup !== blood_group) {
      return res.status(400).json({ message: 'Receiver not eligible for the blood sample' });
    }
  
    // Create a new blood request

    let obj = {
        receiver_id,hospital_id,blood_group }

      const bloodRequest = await bloodrequestModel.create(obj)

      return res.status(201).send({ status: true, message: "created successfully", data: bloodRequest })

     } catch (error) {
      return res.status(500).send({ error: error.message })
  }

 }
module.exports={createBloodRequest};
