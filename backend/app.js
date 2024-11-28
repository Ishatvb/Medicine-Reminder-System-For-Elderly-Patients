const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoUrl = "mongodb+srv://beoharishatv7470:medicinereminderadmin@cluster0.rlinx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// JWT Secret Key
const JWT_SECRET = "hvdvay6ert72839289()aiy8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

// Connect to MongoDB
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(e);
    });

// Import Models
require('./UserDetails');
require('./PrescriptionDetails');
const User = mongoose.model("UserInfo");
const Prescription = mongoose.model("Prescription");


// Directory for image uploads
const uploadDirectory = path.join(__dirname, 'Images');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename
    }
});
const upload = multer({ storage });

// Basic endpoint to test the server
app.get("/", (req, res) => {
    res.send("Server is running.");
});

// User registration endpoint
app.post("/register", async (req, res) => {
    const { name, mobile, age, password } = req.body;

    const oldUser = await User.findOne({ mobile: mobile });
    if (oldUser) {
        return res.status(400).send({ data: "User already exists!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({
            name: name,
            age: age,
            mobile: mobile,
            password: encryptedPassword,
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

// User login endpoint
app.post("/login-user", async (req, res) => {
    const { mobile, password } = req.body;
    const oldUser = await User.findOne({ mobile: mobile });

    if (!oldUser) {
        return res.status(400).send({ data: "User doesn't exist!" });
    }

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ mobile: oldUser.mobile }, JWT_SECRET);
        return res.status(200).send({ status: "ok", data: token });
    } else {
        return res.status(400).send({ error: "Invalid credentials" });
    }
});

// Get user data endpoint
app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const usermobile = user.mobile;

        const userData = await User.findOne({ mobile: usermobile });
        if (userData) {
            return res.status(200).send({ status: "ok", data: userData });
        } else {
            return res.status(404).send({ status: "error", data: "User not found" });
        }
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }
});

// File Upload Endpoint
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }
    const filePath = req.file.path.replace(/\\/g, "/"); // Normalize Windows paths
    res.send({ status: "ok", filePath });
  });


// Function to process the extracted text from image and store in PrescriptionDetails
app.post("/process-image", async (req, res) => {
    const { filePath, userId } = req.body;

    if (!filePath || !userId) {
        return res.status(400).send({ status: "error", message: "File path and user ID are required." });
    }

    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        return res.status(400).send({ status: "error", message: "File does not exist." });
    }

    try {
        const scriptPath = path.join(__dirname, "gemini_api.py");
        const pythonScript = `python "${scriptPath}" "${fullPath}"`;

        exec(pythonScript, async (error, stdout, stderr) => {
            if (error) {
                return res.status(500).send({ status: "error", message: "Image processing failed." });
            }

            const output = JSON.parse(stdout);
            const medicines = output.medicines;
            if (!medicines || medicines.length === 0) {
                return res.status(400).send({ status: "error", message: "No medicines found in the image." });
            }

            // Store extracted medicines in PrescriptionDetails
            const newPrescription = await Prescription.create({
                user: userId,
                medicines: medicines,
            });

            // Store medicines in MedicineDetails and calculate durations
            for (const medicine of medicines) {
                const { name, dosage, quantity } = medicine;
                let duration = calculateMedicineDuration(dosage, quantity);

                // Store medicine in MedicineDetails
                await Medicine.create({
                    user: userId,
                    name: name,
                    dosage: dosage,
                    quantity: quantity,
                    duration: duration
                });
            }

            res.status(200).send({ status: "ok", message: "Prescription processed and medicines stored." });
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error processing the image." });
    }
});

// Get all prescriptions for a user
app.post("/user-prescriptions", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const usermobile = user.mobile;

        // Fetch the user by mobile number
        const userData = await User.findOne({ mobile: usermobile });
        if (!userData) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Fetch prescriptions for the user
        const prescriptions = await Prescription.find({ user: userData._id });
        if (prescriptions.length === 0) {
            return res.status(404).json({ status: "error", message: "No prescriptions found" });
        }

        return res.status(200).json({ status: "ok", data: prescriptions });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ status: "error", message: "Invalid token or server error" });
    }
});



// Start the Express server
app.listen(5050, () => {
    console.log("Node.js server started on port 5050");
});
