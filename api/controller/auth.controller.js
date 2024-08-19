import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const JWT_KEY = "wmybdkjw"

export const register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(201).send("New User has been regsitered!")
    } catch (err) {
        res.status(500).send(`Registration went wrong! Error: ${err}`)
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user)  return res.status(404).send(`User ${req.body.username} not found!`)
        // console.log(user)
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        // console.log(isCorrect)
        if (!isCorrect)  return res.status(400).send("Wrong Password!")
        
        const token = jwt.sign({
            id: user._id, 
            isSeller: user.isSeller,
        }, JWT_KEY)
        
        const {password, ...info} = user._doc   //remove password
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).send(info)
        
    } catch (err) {
        res.status(500).send(`Login went wrong! Error: ${err}`)
    }
}


export const logout = async (req, res) => {
    res.send("from controller")
}