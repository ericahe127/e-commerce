import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import userRoute from "./routes/user.route.js"
import gigRoute from "./routes/gig.route.js"
import orderRoute from "./routes/user.route.js"
import conversationRoute from "./routes/conversation.route.js"
import messageRoute from "./routes/message.route.js"
import reviewRoute from "./routes/review.route.js"
import authRoute from "./routes/auth.route.js"

const app = express()
const port = 8800
dotenv.config()
mongoose.set("strictQuery", true)

// MongoDB Connection Setup
const mongoConnect = async()=>{
    try {
    await mongoose.connect("mongodb+srv://ericahe7:61290990He.@cluster0.d0q7miq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbname=djj");
    console.log("connected to mongodb")
    } catch (error) {
    console.log("error connected to mongodb"+error)
    }
}

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoute)
app.use("/api/gig", gigRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/order", orderRoute)
app.use("/api/message", messageRoute)
app.use("/api/review", reviewRoute)
app.use("/api/auth", authRoute)

app.listen(port, ()=>{
    mongoConnect()
    console.log(`Server listening on port ${port}`)
})