const express = require('express')
const router = express.Router();
const app = express();

const { authentication } = require("../MiddleWare/auth");
const { createHospital,loginHospital,getReceiverDetails } = require('../Controllers/hospitalController');
const {createReceiver,loginReceiver}= require("../Controllers/receiverController")
const {createBloodSample,updateBloodSample,getAllbloodsample,getBloodSampleDetails,deleteBloodSamleById}= require("../Controllers/bloodsampleController")
const {createBloodRequest}= require("../Controllers/bloodrequestController")

router.post("/register", createHospital);
 router.post("/login", loginHospital);
 router.get("/blood-requests/:bloodGroup",authentication,getReceiverDetails);
////////////////////////////////////////////////////////

router.post("/registerReceiver", createReceiver);

router.post("/loginReceiver", loginReceiver);


/////////////////////bloodSample routes/////////////////////////////////////////

router.post("/bloodsamples", authentication,createBloodSample)
router.get("/bloodsampleinfo/:hospital_id",authentication,getBloodSampleDetails)
router.get("/allbloodSamples",getAllbloodsample)
router.put("/bloodsample/:hospital_id",authentication,updateBloodSample)
router.delete("/bloodSample/:BloodSample_id/:hospital_id", authentication,deleteBloodSamleById)

router.post('/blood-requests',authentication, createBloodRequest);



module.exports = router;