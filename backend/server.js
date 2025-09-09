const express = require("express");
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path'); // <-- you missed importing path
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ["https://donatehub.netlify.app"] // your frontend URL
}));
app.use(morgan('dev'));

// API Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Serve static React build
app.use(express.static(path.join(__dirname, "client/build")));

// React routing fallback (for SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Optional root route
app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,
    });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Node Server Running in ${process.env.DEV_MODE} Mode on Port ${PORT}`.bgMagenta.white);
});
