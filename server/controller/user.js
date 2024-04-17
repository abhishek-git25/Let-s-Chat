import { compare } from 'bcrypt';
import { User } from '../models/user.js'
import { cookieOptions, sendToken } from '../utils/features.js';
import { TryCatch } from '../middlewares/error.js';
import { ErrorHandler } from '../utils/utilit.js';
// import { isAthencticated } from '../middlewares/auth.js';


const newUsers = async (req, res) => {

    const { name, username, password, bio } = req.body

    console.log(req.body, "8");

    const avatar = {
        public_id: "sdfsd",
        url: "abc"
    }

    const user = await User.create({
        name,
        username,
        password,
        bio,
        avatar
    })

    // res.status(201).json({ message: "User created successfully" })
    sendToken(res, user, 201, "User Created")

}

const login = TryCatch(async (req, res, next) => {

    const { username, password } = req.body
    const user = await User.findOne({ username }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid Username", 400))
    }
    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return next(new ErrorHandler("Invalid Password", 400))
    }
    sendToken(res, user, 201, `Welcome Back, ${user.name}`)

})

const getMyProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user)
    res.status(200).json({
        succcess: true,
        data: user
    })
})

const logout = TryCatch(async (req, res) => {
    return res.status(200).cookie('lets_chat_token', '', { ...cookieOptions, maxAge: 0 }).json({
        succcess: true,
        message: "Logged out successfully"
    })
})


const searchUser = TryCatch(async (req, res) => {

    const { name } = req.query



    return res.status(200).json({
        succcess: true,
        message: name
    })
})



export { login, newUsers, getMyProfile, logout, searchUser }