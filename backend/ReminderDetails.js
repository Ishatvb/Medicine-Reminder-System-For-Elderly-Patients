const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },  // Example: "30 days"
});

const reminderDetailsSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    breakfast: [medicineSchema],  // Medicines to be taken before breakfast
    lunch: [medicineSchema],      // Medicines to be taken before lunch
    dinner: [medicineSchema],     // Medicines to be taken before dinner
  },
  { timestamps: true }
);

const ReminderDetails = mongoose.model('ReminderDetails', reminderDetailsSchema);

module.exports = ReminderDetails;
