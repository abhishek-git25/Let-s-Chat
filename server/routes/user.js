import express from "express"
import { login} from "../controller/user.js"

const app =  express.Router();

app.get("/login" , login)

export default app