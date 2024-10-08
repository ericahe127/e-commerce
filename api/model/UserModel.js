import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username:{
    type:String,
    required: true,
    unique: true,
  },
  email:{
    type:String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
  },
  img:{
    type:String,
    required: false,
  },
  country:{
    type:String,
    required: true,
  },
  phone:{
    type:String,
    required: false,
  },
  description:{
    type:String,
    required: false,
  },
  isSeller:{
    type:String,
    default: false
  },
}, {
    timestamp: true
});

export default mongoose.model("User", UserSchema)