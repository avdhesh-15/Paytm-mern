const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://paytm-mern-front.vercel.app" // prod frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.json("Server is up and running");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed", err);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(` Server is running on port: ${PORT}`);
});
