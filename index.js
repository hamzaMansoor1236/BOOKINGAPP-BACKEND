import express from "express" 
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error;
    }
};

//triggered on auto reconnect
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
})

//triggered on Disconnect
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
})


app.use(cookieParser())
app.use(express.json())


// middleware
app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute)

// custom error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
})




app.listen(8800, () => {
    connect();
    console.log("Connected to the backend port 8800");
})

