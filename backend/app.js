const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const cors = require('cors');



// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoUrl = "mongodb+srv://beoharishatv7470:medicinereminderadmin@cluster0.rlinx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// JWT Secret Key
const JWT_SECRET = "hvdvay6ert72839289()aiy8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

// Connect to MongoDB
mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(e);
    });
require('./UserDetails')
const User = mongoose.model("UserInfo");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + '-' + path.extname(file.originalname)) // Name of the file
    }
});

const upload = multer({ storage: storage })

// Basic endpoint for testing the server
app.get("/upload", (req, res) => {
    res.render("upload");
});

// User registration endpoint
app.post("/register", async (req, res) => {
    const { name, mobile, age, password } = req.body;

    const oldUser = await User.findOne({ mobile: mobile });

    if (oldUser) {
        return res.send({ data: "user already exists!!!" });
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
        res.send({ status: "error", data: error });
    }
});

// User login endpoint
app.post("/login-user", async (req, res) => {
    const { mobile, password } = req.body;
    const oldUser = await User.findOne({ mobile: mobile });

    if (!oldUser) {
        return res.send({ data: "User doesn't exists !!!" })
    }

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ mobile: oldUser.mobile }, JWT_SECRET);

        if (res.status(201)) {
            return res.send({ status: "ok", data: token });
        }
        else {
            return res.send({ error: "error" });
        }
    }
});

// Get user data endpoint
app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const usermobile = user.mobile;

        User.findOne({ mobile: usermobile }).then((data) => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error) {
        return res.send({ error: error });
    }
});

// File upload endpoint
app.post("/upload", upload.single('image'), (req, res) => {
    // if (!req.file) {
    //     console.error('No file uploaded');
    //     return res.status(400).send({ status: "error", message: "No file uploaded!" });
    // }

    // console.log("Uploaded file successfully:", req.file); // Log the uploaded file details
    // res.json({ status: 'ok', message: 'File uploaded successfully', filePath: req.file.path });
    res.send("Image Uploaded");
});

// Start the Express server
app.listen(5050, () => {
    console.log("Node js server started.");
})

