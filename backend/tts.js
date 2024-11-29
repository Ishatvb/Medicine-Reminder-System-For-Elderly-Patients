const googleTTS = require('google-tts-api'); // Import the google-tts-api package

/**
 * Function to send text-to-speech reminders for medicines.
 * @param {Array} medicines - List of medicines to remind the user about.
 * @param {String} mealType - Type of meal (e.g., "breakfast", "lunch", "dinner").
 */
async function sendTTSReminder(medicines, mealType) {
    console.log(`Sending TTS reminders for ${mealType}:`);
    
    for (const medicine of medicines) {
        // Generate the TTS message
        const ttsMessage = `नमस्ते, अपनी दवा लेने का समय है: ${medicine.name}. आपके पास ${medicine.duration-1} दिन बाकी हैं।`;
        // const ttsMessage = `Hello, it's time to take your medicine: ${medicine.name}. You have ${medicine.duration-1} days left.`;
        console.log(`TTS Message: ${ttsMessage}`);

        try {
            // Dynamically import 'open' as it's an ES module
            const { default: open } = await import('open');

            // Generate the audio URL for the TTS message
            const audioUrl = googleTTS.getAudioUrl(ttsMessage, {
                lang: 'hi',  // Language set to English
                slow: false, // Normal speed
                host: 'https://translate.google.com', // Google Translate API host
            });

            console.log(`Generated audio URL for ${medicine.name}: ${audioUrl}`);

            // Play the audio using the default browser
            await open(audioUrl);

            // Delay to avoid overlapping audio playback
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
            console.error(`Error generating TTS for medicine ${medicine.name}:`, error.message || error);
        }
    }
}

// Export the function for use in other modules
module.exports = sendTTSReminder;

// Example usage (for testing purposes)
if (require.main === module) {
    // Sample medicines and meal type
    const exampleMedicines = [
        { name: "AMARYL M FORTE 2MG TABLET", dosage: "1-1-0", duration: 30, timing: "breakfast" },
        { name: "RABENDA PLUS", dosage: "1-0-0", duration: 20, timing: "breakfast" },
    ];
    const mealType = 'breakfast';

    // Call the TTS reminder function
    sendTTSReminder(exampleMedicines, mealType).then(() => {
        console.log('TTS reminders sent successfully.');
    }).catch(error => {
        console.error('Error sending TTS reminders:', error.message || error);
    });
}
