import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()
const port = 8800
dotenv.config()
mongoose.set("strictQuery", true)

// MongoDB Connection Setup
const mongoConnect = async()=>{
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb")
    } catch (error) {
    console.log("error connected to mongodb")
    }
}

app.listen(port, ()=>{
    mongoConnect()
    console.log(`Server listening on port ${port}`)
})