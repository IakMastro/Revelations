import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import dockerRouter from './routes/docker.js'

const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(dockerRouter)
app.listen(5000, "0.0.0.0", () => { console.log("Middleware was launched successfully!"); })