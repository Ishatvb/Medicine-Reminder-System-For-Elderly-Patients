const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },  // breakfast/lunch/dinner
  duration: { type: Number, required: true }, // Duration as an integer  Example: "30 days"
  timing: { type: String, required: true }
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


