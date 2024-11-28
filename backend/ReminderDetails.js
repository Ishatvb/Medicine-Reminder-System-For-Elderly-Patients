// reminderschema.js
const mongoose = require('mongoose');

const ReminderDetailsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription', required: true },
  medicine: { type: String, required: true },
  reminder_time: { type: Date, required: true }, // The time to remind the user
  is_completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reminder', ReminderDetailsSchema);
