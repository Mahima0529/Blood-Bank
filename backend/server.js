const express = require("express");
const dotenv = require('dotenv')
const colors = require('colors')
const morgan= require('morgan')
const cors= require('cors');
const connectDB = require("./config/db");
const jwt =require('jsonwebtoken')
//dot config
dotenv.config();

//mongodb coonection
connectDB();

//rest object
const app= express();

//middlewares
app.use(express.json())
app.use(cors({
    origin :["https://donatehub.netlify.app"]
}));
app.use(morgan('dev'))
   




//routes
//1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
//port


///STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/build")));

//STATIS ROUTES
app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})



const PORT= process.env.PORT|| 8080;


app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})
//listen
app.listen(PORT,()=>{
    console.log(`Node Server Runiing In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`.bgMagenta.white

    );
});

