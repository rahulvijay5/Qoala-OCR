const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ocrRoutes = require("./routes/ocrRoutes");
const dbRoutes = require("./routes/dbRoutes");

const app = express();
const port = process.env.PORT || 3001;

// strict mode of mongodb is off
mongoose.set("strictQuery", true);

app.use(cors());

// mongoose.connect(process.env.MONGODB_URI);

//   const db = mongoose.connection;

//   db.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
//   });

//   db.once('open', () => {
//     console.log('Connected to MongoDB');
//   });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Thai ID Card OCR BACKEND");
});

app.use("/api", ocrRoutes);
app.use("/api", dbRoutes);

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    db.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    db.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

connectDB().then(startServer());
