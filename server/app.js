import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import { createServer } from 'http'
import { v4 as uuid } from 'uuid'
import { connectDB } from "./utils/features.js";
import { Server } from "socket.io";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors"
import { v2 as cloudinary } from "cloudinary"




dotenv.config({
    path: "./.env",
})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ABHISHEK_YADAV"
export const userSocketIds = new Map()

connectDB(mongoURI)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// createUser(10)

// createSingleChats(10)
// createGroupChats(10)

// createMessagesInAChat("6629507788a891b703f85bff" , 10)


const app = express()

const server = createServer(app)
const io = new Server(server, {})

//Using middleware

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:8001", "http://localhost:5173", "http://localhost:4173"],
    credentials: true
}))


app.use("/user", userRoutes)
app.use("/chat", chatRoutes)
app.use("/admin", adminRoutes)


app.get("/", (req, res) => {
    res.send("Hello World")
})

io.use((socket, next) => {

})

io.on("connection", (socket) => {

    const user = {
        _id: "adslc",
        name: "adcld"
    }

    userSocketIds.set(user._id.toString(), socket.id)
    console.log("a user connected", socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
        const messageForRealTime = {
            content: messages,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chatId: chatId,
            createdAt: new Date().toISOString()
        }
        const messageForDB = {
            content: messages,
            sender: user._id,
            chat: chatId
        }

        const membersSocket = getSockets(members)
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime
        })
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId })

        try {
            await Message.create(messageForDB)
        } catch (error) {
            console.log(error);
        }
    })


    socket.on("disconnect", (socket) => {
        console.log("user disconnected");
        userSocketIds.delete(user._id.toString())
    })
})


app.use(errorMiddleware)


server.listen(port, () => {
    console.log(`Server is running on port ${port} on ${process.env.NODE_ENV}`);
})