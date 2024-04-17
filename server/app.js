import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.js'
import chatRoutes from "./routes/chat.js"
import { createUser } from "./seeders/seeders.js";



dotenv.config({
    path: "./.env",
})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000

connectDB(mongoURI)

// createUser(10)


const app = express()

//Using middleware

app.use(express.json());
app.use(cookieParser())



app.use("/user", userRoutes)
app.use("/chat" , chatRoutes)

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        statuscode: err.statuscode
    });
});

app.use(errorMiddleware)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})