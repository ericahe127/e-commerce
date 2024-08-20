import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"
const JWT_KEY = "wmybdkjw"

export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(201).send("New User has been regsitered!")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username}); //console.log(user)
        if (!user)  return next(createError(404, `User ${req.body.username} not found!`))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)  // console.log(isCorrect)
        if (!isCorrect)  return next(createError(400, "Wrong Password!"))
        
        const token = jwt.sign({
            id: user._id, 
            isSeller: user.isSeller,
        }, JWT_KEY)
        
        const {password, ...info} = user._doc   //remove password
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).send(info)
        
    } catch (err) {
        next(err)
    }
}


export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",       //React app not the same address as server.js
        secure: true,
    }).status(200).send("User hasbeen logged out.")
}