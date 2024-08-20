import User from "../model/UserModel.js"
import createError from "../utils/createError.js"

export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    // console.log("found user: "+user.username)
    if (req.useId === user._id.toString()){
        await User.findByIdAndDelete(req.params.id)
        return next(createError(200, "deleted."))
    } else{
        return next(createError(403, "You can only delete your account"))
    }    
}