// MedicineDetails.js
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  composition: { 
    type: String, 
    required: false 
 }, 
  breakfast: 
  {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  timings: { 
    type: String, 
    required: true 
 }
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
