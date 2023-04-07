
const bloodSampleModel= require("../Models/bloodsampleModel");
const hospitalModel= require("../Models/hospitalModel");

const {isValidObjectId}= require("mongoose")
const {isValid}= require("../Validator/validation")

const createBloodSample = async function (req, res) {
    try {
        const data = req.body
        const { hospital_id,blood_group,quantity,is_available} = data;
        const decodedToken = req.decodedToken
      if(!hospital_id)return res.status(400).send({status:false, message:"Hospital id required"})
        if (!isValidObjectId(hospital_id)) return res.status(400).send({ status: false, message: "Hospital Id is not valid" })
      if(!blood_group)
      if (!isValid(blood_group)) return res.status(400).send({ status: false, message: "blood_group is mandatory " })
      
      let bloodGroup = blood_group.split(',').map(x => x.trim())

      for (let i = 0; i < bloodGroup.length; i++) {
          if (!(["A+","B+","AB+","O+","A-","B-","AB-","O-"].includes(bloodGroup[i]))) return res.status(400).send({ status: false, message: `bloodGroup should be only from these ["A+","B+","AB+","O+","A-","B-","AB-","O-""]` })
      }



      let   hospital= await hospitalModel.findOne({_id:hospital_id})

      if(!hospital) return res.status(404).send({ status: false, messgage: ' Hospital data not found' })
     
      if (hospital_id !== decodedToken.hospitalUserId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })
      // let availableBloodSample= await bloodSampleModel.findOne({blood_group})
      // if(availableBloodSample){
      
      //   let qty= Number(availableBloodSample.quantity) +1;
      //   let updatedBloodSample= await bloodSampleModel.findOneAndUpdate({hospital_id:hospital_id},{$set:{quantity:qty}},{new:true})
      //   return res.status(201).send({ status: true, message: "created successfully", data: updatedBloodSample })
      // }
      // else{
        let obj = {
        hospital_id , blood_group ,quantity,is_available }

      const bloodSample = await bloodSampleModel.create(obj)

      return res.status(201).send({ status: true, message: "created successfully", data: bloodSample })
        
  } catch (error) {
      return res.status(500).send({ error: error.message })
  }
}
/////////////////////////////////////////update bloodsample//////////////////////////////

const updateBloodSample= async function(req,res){


try {
  const hospital_id= req.params.hospital_id
  const data = req.body
  const { blood_group,quantity,is_available} = data;
  const decodedToken = req.decodedToken

  if (!isValidObjectId(hospital_id)) return res.status(400).send({ status: false, message: "Hospital Id is mandatory and should have non empty String" })

let   hospital= await hospitalModel.findOne({_id:hospital_id})

if(!hospital) return res.status(404).send({ status: false, messgage: ' Hospital data not found' })
if (hospital_id !== decodedToken.hospitalUserId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })
//let TypesOfBloodGroup=["A+","B+","AB+","O+","A+","B+","AB+","O+"];

if (!isValid(blood_group)) return res.status(400).send({ status: false, message: "blood_group is mandatory " })
      
let bloodGroup = blood_group.split(',').map(x => x.trim())

for (let i = 0; i < bloodGroup.length; i++) {
    if (!(["A+","B+","AB+","O+","A-","B-","AB-","O-"].includes(bloodGroup[i]))) return res.status(400).send({ status: false, message: `bloodGroup should be only from these ["A+","B+","AB+","O+","A-","B-","AB-","O-""]` })
}

if(!quantity)return res.status(400).send({ status: false, message: "quantity is required " })

  let updatedBloodSample= await bloodSampleModel.findOneAndUpdate({blood_group:blood_group},{$set:data},{new:true})
  return res.status(201).send({ status: true, message: "Updated successfully", data: updatedBloodSample })

} catch (error) {
return res.status(500).send({ error: error.message })
}
}

/////////////////////////////////get all Blood Samples/////////////////////////////////////////////////

const  getBloodSampleDetails = async function(req, res) {
  try {
    const hospital_id = req.params.hospital_id;

   if(!hospital_id) return res.status(400).send({ status: false, message: "hospital_id is required in params " })

    let data = await bloodSampleModel.find({hospital_id:hospital_id})
     //console.log(bloodSample)
        if (data.length == 0) {
          return res.status(404).json({ message: 'No blood info found for the hospital' });
        }
      
      return res.status(200).send({ status: true, message: "Success", data: data })

  } catch (error) {
      return res.status(500).send({ status: false, error: error.message })
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAllbloodsample= async function(req,res){
try{

 
    let data = await bloodSampleModel.find().populate("hospital_id","name email phone blood_group address")
        if (data.length == 0) {
            return res.status(404).send({ status: false, message: "No Blood Sample found " });
        }

        return res.status(200).send({ status: true, message: "Success", "number of Samples": data.length, data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const  deleteBloodSamleById = async function(req, res) {
  try {
      const BloodSampleId = req.params.BloodSample_id;
      const hospital_id= req.params.hospital_id;

      const decodedToken = req.decodedToken
      if(!BloodSampleId)return res.status(400).send({status:false, message:"Hospital id required"})
        if (!isValidObjectId(hospital_id)) return res.status(400).send({ status: false, message: "Hospital Id is not valid" })
       
        if(!hospital_id)return res.status(400).send({status:false, message:"BloodSample id is required"})
          if (!isValidObjectId(hospital_id)) return res.status(400).send({ status: false, message: "BloodSample Id is not valid" })
          if (hospital_id !== decodedToken.hospitalUserId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })
      let data = await bloodSampleModel.findOne({ _id: BloodSampleId, isDeleted: false })
      if (!data) return res.status(404).send({ status: true, message: "No Blood Sample found or may be deleted already" });

      await bloodSampleModel.findByIdAndUpdate(BloodSampleId, { isDeleted: true, })
      return res.status(200).send({ status: true, message: "Deleted Successfully" });

  } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}
module.exports={createBloodSample,updateBloodSample,getBloodSampleDetails,getAllbloodsample,deleteBloodSamleById};