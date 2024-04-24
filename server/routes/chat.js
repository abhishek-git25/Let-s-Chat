import express from "express"
import { isAthencticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, sendAttachments } from "../controller/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();



app.use(isAthencticated)
// After this user must be logged in to access routes

app.post("/new_group_chat", newGroupChat)
app.get("/my_chats", getMyChats)
app.get("/my_groups", getMyGroups)
app.put("/add_members", addMembers)
app.put("/remove_members", removeMembers)
app.delete("/leave_group/:id", leaveGroup)
app.post("/send_attachment" , attachmentsMulter , sendAttachments)




export default app