const mongoose = require('mongoose');

const PrescriptionDetailsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  medicines: [
    {
      name: { type: String, required: true }, // Name of the medicine
      composition: { type: String, required: false }, // Composition of the medicine (optional)
      dosage: {
        breakfast: { type: Number, required: true, default: 0 }, // Number of tablets to take before breakfast
        lunch: { type: Number, required: true, default: 0 }, // Number of tablets to take before lunch
        dinner: { type: Number, required: true, default: 0 }, // Number of tablets to take before dinner
      },
      duration: { type: String, required: true }, // Duration (e.g., "30 days")
      timings: { type: [String], required: true }, // Timings (array of strings, e.g., ["before breakfast", "before dinner"])
    },
  ],
  created_at: { type: Date, default: Date.now }, // Automatically set to current date
});

module.exports = mongoose.model('Prescription', PrescriptionDetailsSchema);
