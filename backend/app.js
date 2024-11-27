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

// User schema and model
require('./UserDetails');
const User = mongoose.model("UserInfo");

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

// Endpoint to process and extract text from uploaded images
// Image Processing Endpoint
app.post("/process-image", async (req, res) => {
    const { filePath } = req.body;
    if (!filePath) {
      return res.status(400).send({ status: "error", message: "File path is required." });
    }
  
    const fullPath = path.join(__dirname, filePath);
    console.log("Processing image at path:", fullPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(400).send({ status: "error", message: "File does not exist." });
    }
  
    const pythonScript = `python gemini_api.py "${fullPath}"`;
    exec(pythonScript, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", stderr);
        return res.status(500).send({ status: "error", message: "Image processing failed." });
      }
  
      try {
        const output = JSON.parse(stdout);
        res.send({ status: "ok", data: output });
      } catch (err) {
        console.error("Invalid response format from Python script:", err);
        res.status(500).send({ status: "error", message: "Invalid response from processing script." });
      }
    });
  });

// Start the Express server
app.listen(5050, () => {
    console.log("Node.js server started on port 5050");
});
