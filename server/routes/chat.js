import express from "express"
import { isAthencticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controller/chat.js";

const app = express.Router();



// After this user must be logged in to access routes
app.use(isAthencticated)
app.post("/new_group_chat" , newGroupChat)


export default app