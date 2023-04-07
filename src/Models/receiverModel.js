const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  blood_group: {
      type:[String], 
      enum:["A+", "B+","AB+","O+", "A-","B-","AB-","O-"],
      trim:true   ,
      required: true
  
  },
  address: {
    type: String,
    required: true
  },
 
 
  blood_requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodRequest'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Receiver', receiverSchema);
