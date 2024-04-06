import { compare } from 'bcrypt';
import { User } from '../models/user.js'
import { sendToken } from '../utils/features.js';


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

const login = async(req, res) => {
    const {username , password} =  req.body
    const user =  await User.findOne({ username }).select("+password")

    if(!user){
        return res.status(400).json({ message : "Invalid Credentials" })
    }
    const isMatch = await compare(password , user.password)

    if(!isMatch){
        return res.status(400).json({ message : "Invalid Credentials" })
    }
    sendToken(res, user, 201, `Welcome Back, ${user.name}`)

}

export { login, newUsers }