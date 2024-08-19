import mongoose from 'mongoose';
const { Schema } = mongoose;

const Coversation = new Schema({
  id:{
    type:String,
    required: true,
    unique: true
  },
  sellerId:{
    type:String,
    required: true
  },
  buyerId:{
    type:String,
    required: true
  },
  readBySeller:{
    type:Boolean,
    default: 0
  },
  readByBuyer:{
    type:Boolean,
    default: 0
  },
  lastMessage:{
    type:String,
    required: false
  },
}, {
    timestamps: true
});

export default mongoose.model("Coversation", CoversationSchema)