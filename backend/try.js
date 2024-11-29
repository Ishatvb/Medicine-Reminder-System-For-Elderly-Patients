// Import dependencies
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import Models
require('./UserDetails');
require('./PrescriptionDetails');
require('./ReminderDetails'); // Import the ReminderDetails schema
const sendTTSReminder = require('./tts'); // Import the TTS reminder module

const User = mongoose.model("UserInfo");
const Prescription = mongoose.model("Prescription");
const ReminderDetails = mongoose.model("ReminderDetails");

// MongoDB connection URI
const MONGO_URI = "mongodb+srv://beoharishatv7470:medicinereminderadmin@cluster0.rlinx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// JWT Secret Key
const JWT_SECRET = "hvdvay6ert72839289()aiy8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

// Function to connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

// Helper function to convert duration to days (integer)
function convertToDays(duration) {
    if (typeof duration === 'string') {
        // If duration contains 'days', directly return the number
        if (duration.includes('days')) {
            return parseInt(duration);
        }
        
        // If duration contains 'months', convert months to days (approx. 30 days per month)
        if (duration.includes('month')) {
            const months = parseInt(duration);
            return months * 30; // Convert months to days
        }
    }

    // If duration is already a number (integer), return it directly
    return parseInt(duration);
}


// Helper function to filter medicines based on timing
function filterMedicines(prescriptions, timingKeyword) {
    const mealMedicines = [];
    prescriptions.forEach(prescription => {
        prescription.medicines.forEach(medicine => {
            if (medicine.timings.some(time => time.toLowerCase().includes(timingKeyword))) {
                mealMedicines.push({
                    name: medicine.name,
                    dosage: medicine.dosage[timingKeyword] || 1, // Default dosage
                    duration: convertToDays(medicine.duration), // Convert duration to days
                    timing: timingKeyword
                });
            }
        });
    });
    return mealMedicines;
}

// Function to update duration after reminder is sent
async function updateReminderDuration(mealMedicines) {
    mealMedicines.forEach(medicine => {
        if (medicine.duration > 0) {
            medicine.duration -= 1; // Decrement the duration by 1 day after reminder
        }
    });
}

// Function to fetch and store medicines for all meals
async function fetchAndStoreMedicinesForAllMeals(token) {
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const usermobile = user.mobile;

        console.log('Token verified, user mobile:', usermobile);

        const userData = await User.findOne({ mobile: usermobile });
        if (!userData) {
            console.log('User not found');
            return;
        }

        console.log('User data retrieved:', userData);

        const prescriptions = await Prescription.find({ user: userData._id });
        if (prescriptions.length === 0) {
            console.log('No prescriptions found for this user');
            return;
        }

        console.log('Prescriptions retrieved:', prescriptions);

        // Get medicines for each meal
        const breakfastMedicines = filterMedicines(prescriptions, "breakfast");
        const lunchMedicines = filterMedicines(prescriptions, "lunch");
        const dinnerMedicines = filterMedicines(prescriptions, "dinner");

        console.log('Breakfast Medicines:', breakfastMedicines);
        console.log('Lunch Medicines:', lunchMedicines);
        console.log('Dinner Medicines:', dinnerMedicines);

        // Check if a ReminderDetails document exists for the user
        let reminder = await ReminderDetails.findOne({ user: userData._id });
        if (!reminder) {
            reminder = new ReminderDetails({
                user: userData._id,
                breakfast: breakfastMedicines,
                lunch: lunchMedicines,
                dinner: dinnerMedicines
            });
        } else {
            // Update existing document
            reminder.breakfast = breakfastMedicines;
            reminder.lunch = lunchMedicines;
            reminder.dinner = dinnerMedicines;
        }

        console.log('ReminderDetails to be saved:', reminder);

        await reminder.save();
        console.log('Reminder details saved successfully');

        // Send TTS reminders
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour === 8) {
            console.log('Sending Breakfast Reminders');
            await sendTTSReminder(breakfastMedicines, "breakfast");
            await updateReminderDuration(breakfastMedicines); // Update duration after sending reminder
        } else if (currentHour === 13) {
            console.log('Sending Lunch Reminders');
            await sendTTSReminder(lunchMedicines, "lunch");
            await updateReminderDuration(lunchMedicines); // Update duration after sending reminder
        } else if (currentHour === 20) {
            console.log('Sending Dinner Reminders');
            await sendTTSReminder(dinnerMedicines, "dinner");
            await updateReminderDuration(dinnerMedicines); // Update duration after sending reminder
        }

        // Save updated ReminderDetails to the database after updating durations
        await reminder.save();
        console.log('Updated Reminder details saved successfully');
    } catch (error) {
        console.error('Error fetching and storing medicines for all meals:', error.message || error);
    } finally {
        mongoose.disconnect();
    }
}

// Main function to execute the script
(async function main() {
    try {
        const token = jwt.sign({ mobile: "7470706580" }, JWT_SECRET, { expiresIn: "1d" });

        await connectToDatabase();
        await fetchAndStoreMedicinesForAllMeals(token);
    } catch (error) {
        console.error('Error in main execution:', error.message || error);
    }
})();
