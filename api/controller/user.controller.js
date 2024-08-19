import User from "../model/UserModel.js"
import jwt from "jsonwebtoken"

const JWT_KEY = "wmybdkjw"

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // console.log("found user: "+user.username)
        const token = req.cookies.accessToken
        if (!token) return res.status(401).send("You are not authenticated!!")
        //check if cookie holder and the id requested to be deleted is from the same user
        jwt.verify(token, JWT_KEY, async (err, payload)=>{  
           if (payload.id === user._id.toString()){
                await User.findByIdAndDelete(req.params.id)
                res.status(200).send("deleted.")
           }
           else{
            res.status(403).send("You can only delete your account")
           }
        })
        
    } catch (error) {     
    }
}