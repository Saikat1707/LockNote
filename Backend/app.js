import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import express from "express"
import { DbConnection } from "./utils/config.js"
DbConnection()
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

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

