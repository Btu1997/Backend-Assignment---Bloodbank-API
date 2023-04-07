const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true
  },
  blood_samples: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodSample'
  }]
},
 {
  timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema);
