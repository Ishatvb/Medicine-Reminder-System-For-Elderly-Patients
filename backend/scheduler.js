const cron = require('node-cron');
const ReminderDetails = require('./ReminderDetails');
const sendTTSReminder = require('./tts');

async function sendRemindersForMeal(mealType, hour) {
    try {
        console.log(`Sending reminders for ${mealType} at ${hour}:00`);

        const reminders = await ReminderDetails.find();
        for (const reminder of reminders) {
            const medicines = reminder[mealType];
            if (medicines.length > 0) {
                await sendTTSReminder(medicines, mealType);
            }
        }
    } catch (error) {
        console.error(`Error in sending ${mealType} reminders:`, error);
    }
}

// Schedule reminders
cron.schedule('0 8 * * *', () => sendRemindersForMeal('breakfast', 8)); // 8 AM
cron.schedule('0 13 * * *', () => sendRemindersForMeal('lunch', 13));    // 1 PM
cron.schedule('0 20 * * *', () => sendRemindersForMeal('dinner', 20));   // 8 PM

console.log('Scheduler initialized for daily reminders.');
