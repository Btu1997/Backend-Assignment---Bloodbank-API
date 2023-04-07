const express = require('express')
const router = express.Router();
const app = express();

const { authentication } = require("../MiddleWare/auth");
const { createHospital,loginHospital,getReceiverDetails } = require('../Controllers/hospitalController');
const {createReceiver,loginReceiver}= require("../Controllers/receiverController")
const {createBloodSample,updateBloodSample}= require("../Controllers/bloodsampleController")
const {createBloodRequest}= require("../Controllers/bloodrequestController")

router.post("/register", createHospital);
 router.post("/login", loginHospital);
 router.get("/blood-requests/:bloodGroup",authentication,getReceiverDetails);
////////////////////////////////////////////////////////

router.post("/registerReceiver", createReceiver);

router.post("/loginReceiver", loginReceiver);


/////////////////////bloodSample routes/////////////////////////////////////////

router.post("/bloodsamples", authentication,createBloodSample)

router.put("/bloodsample/:hospital_id",authentication,updateBloodSample)

router.post('/blood-requests',authentication, createBloodRequest);



module.exports = router;