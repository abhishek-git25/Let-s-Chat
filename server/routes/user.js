import express from "express"
import { getMyProfile, login, logout, newUsers, searchUser } from "../controller/user.js"
import { singleAvatar } from "../middlewares/multer.js";
import { isAthencticated } from "../middlewares/auth.js";

const app = express.Router();


app.post("/new", singleAvatar, newUsers)
app.post("/login", login)


// After this user must be logged in to access routes
app.use(isAthencticated)

app.get('/me', getMyProfile)
app.get('/logout', logout)
app.get('/search' , searchUser)

export default app