import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utilit.js";
import { adminSecretKey } from "../app.js";


const isAthencticated = (req, res, next) => {

    const token = req.cookies['lets_chat_token']
    if (!token) {
        return next(new ErrorHandler("Please login first", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedData._id
    next()
}

const isAdminOnly = (req, res, next) => {
    const token = req.cookies['lets-chat-admin-token']
    if (!token) {
        return next(new ErrorHandler("Only admin can access this route", 401))
    }


    const secretKey = jwt.verify(token, process.env.JWT_SECRET)

    const isMatch = secretKey === adminSecretKey
    if (!isMatch) {
        return next(new ErrorHandler("Invalid admin key", 401))
    }
    next()
}



export { isAthencticated, isAdminOnly }