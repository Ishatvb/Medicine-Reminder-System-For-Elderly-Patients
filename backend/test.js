const mongoose = require("mongoose");

// Import your models
require('./UserDetails');
require('./PrescriptionDetails');
const User = mongoose.model("UserInfo");
const Prescription = mongoose.model("Prescription");

// MongoDB connection URI
const mongoUrl = "mongodb+srv://beoharishatv7470:medicinereminderadmin@cluster0.rlinx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Sample prescription outputs
const prescriptionOutputs = [
    {
        userMobile: "9012345678", // Mobile number to identify the user
        medicines: [
            {
                name: "TRIOBIMET 2MG TABLET",
                composition: "Glimepiride 2 MG + Metformin 500 MG + Pioglitazone 15 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["before breakfast", "before dinner"]
            },
            {
                name: "LINARESE",
                composition: "LINAGLIPTIN 5MG + EMPAGLIFLOZIN 25MG",
                dosage: {
                    breakfast: 0,
                    lunch: 1,
                    dinner: 0
                },
                duration: "30 days",
                timings: ["before lunch"]
            },
            {
                name: "BONJOY PLUS",
                composition: "CALCITRIOL 0.25MCG + CALCIUM CARBONATE 500MG + ZINC 7.5MG",
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["after dinner"]
            }
        ],
    },
    {
        userMobile: "7470706580",
        medicines: [
            {
                name: "AMARYL M FORTE 2MG TABLET",
                composition: "GLIMEPIRIDE 2 MG + METFORMIN 1000 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["before breakfast", "before dinner"]
            },
            {
                name: "VIBITE M 50/500",
                composition: "METFORMIN 500 MG + VILDAGLIPTIN 50 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["before breakfast", "before dinner"]
            },
            {
                name: "ECOSPRIN-AV 75/10 CAPSULE",
                composition: "ASPIRIN 75 MG + ATORVASTATIN 10 MG",
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["after dinner"]
            },
            {
                name: "CALTIVITE PLUS",
                composition: null,
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["after dinner"]
            }
        ],
    },
    {
        userMobile: "9012345678",
        medicines: [
            {
                name: "TRIVOLIB FORTE 2MG TABLET",
                composition: "GLIMEPIRIDE 2 MG + METFORMIN 500 MG + VOGLIBOSE 0.3 MG",
                dosage: {
                    breakfast: 0,
                    lunch: 1,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["before lunch", "before dinner"]
            },
            {
                name: "XIGDUO XR 10MG/500MG TABLET",
                composition: "DAPAGLIFLOZIN 10 MG + METFORMIN 500 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 0
                },
                duration: "30 days",
                timings: ["before breakfast"]
            },
            {
                name: "GLURA SR 100 MG",
                composition: "SITAGLIPTIN 100 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 0
                },
                duration: "30 days",
                timings: ["before breakfast"]
            },
            {
                name: "ROSULESS A 10MG CAPSULE",
                composition: "ASPIRIN 75MG + ROSUVASTATIN 10 MG",
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["after dinner"]
            },
            {
                name: "LAREGAB NT TABLET",
                composition: "GABAPENTIN 400 MG + NORTRIPTYLINE 10 MG",
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["after dinner"]
            }
        ],
    },
    {
        userMobile: "7470706580",
        medicines: [
            {
                name: "GLIZIHENZ M 80MG/500MG TABLET",
                composition: "Gliclazide 80 MG + Metformin 500 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["before breakfast", "before dinner"]
            },
            {
                name: "DAPAHENZ S 10/100 TABLET",
                composition: "Dapagliflozin 10 MG + Sitagliptin 100 MG",
                dosage: {
                    breakfast: 0,
                    lunch: 1,
                    dinner: 0
                },
                duration: "30 days",
                timings: ["after lunch"]
            },
            {
                name: "FORTIUS F 20",
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["after dinner"]
            },
            {
                name: "RABENDA PLUS",
                composition: "Levosulpiride 75MG + Rabeprazole 20 MG",
                dosage: {
                    breakfast: 1,
                    lunch: 0,
                    dinner: 0
                },
                duration: "20 days",
                timings: ["before breakfast"]
            },
            {
                name: "NEURONE G",
                composition: "METHYLCOBALAMIN 1500 MCG + PREGABALIN 75 MG",
                dosage: {
                    breakfast: 0,
                    lunch: 0,
                    dinner: 1
                },
                duration: "30 days",
                timings: ["before bed"]
            }
        ],
    },
];


// Function to insert prescriptions into the database
async function insertPrescriptions() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUrl);
        console.log("Database connected successfully!");

        for (const prescriptionData of prescriptionOutputs) {
            // Find the user by mobile number
            const user = await User.findOne({ mobile: prescriptionData.userMobile });

            if (!user) {
                console.error(`User with mobile ${prescriptionData.userMobile} not found. Skipping.`);
                continue;
            }

            // Create a new prescription linked to the user's ObjectId
            const newPrescription = new Prescription({
                user: user._id,
                medicines: prescriptionData.medicines,
            });

            // Save to the database
            await newPrescription.save();
            console.log(`Inserted prescription for user: ${user.name} (${user.mobile})`);
        }

        console.log("All prescriptions inserted successfully!");
    } catch (error) {
        console.error("Error inserting prescriptions:", error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
}

// Run the script
insertPrescriptions();
