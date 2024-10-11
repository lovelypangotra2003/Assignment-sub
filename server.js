import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());// to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

//root route http://localhost:8000/
// app.get("/",(req,res)=>{
//     res.send("Hello world!!");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});

