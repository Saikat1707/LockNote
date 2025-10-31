import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import express from "express"
import { DbConnection } from "./utils/config.js"
DbConnection()
const app = express()
import cors from "cors"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173" || "https://lock-note-hazel.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true
}))

import userRouter from "./routes/user.routes.js"
import folderRouter from "./routes/folder.routes.js"
import fileRouter from "./routes/file.routes.js"


app.use('/api/user',userRouter)
app.use('/api/folder',folderRouter)
app.use('/api/file',fileRouter)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Successfully running the server on ${port}`)
})

