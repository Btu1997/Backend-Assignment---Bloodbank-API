const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',
    required: true
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  blood_group: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
