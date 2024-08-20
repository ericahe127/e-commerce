import createError from "../utils/createError.js"
import jwt from "jsonwebtoken"

const JWT_KEY = "wmybdkjw"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return next(createError(401, "You are not authenticated!!"))
    jwt.verify(token, JWT_KEY, async (err, payload)=>{  
        if (err) return next(createError(403, "Token not valid!"))
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next(); //go to next function
    })
}