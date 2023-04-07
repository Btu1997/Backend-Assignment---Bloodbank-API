const mongoose = require('mongoose');

const bloodSampleSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  blood_group: {
    type:[String], 
    enum:["A+","B+","AB+","O+","A+","B+","AB+","O+"],
    trim:true   
    
  },
  is_available: {
    type: Boolean,
    default: true
  },
  quantity:{
    type : String,
    required:true,
    default: 1
  },
  isDeleted:{
    type : Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BloodSample', bloodSampleSchema);
