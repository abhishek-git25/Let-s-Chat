import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utilit.js";


const isAthencticated = (req, res, next) => {

    const token = req.cookies['lets_chat_token']
    if(!token){
        return next(new ErrorHandler("Please login first" , 401))
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECRET)
    req.user = decodedData._id
    next()
}
export { isAthencticated }