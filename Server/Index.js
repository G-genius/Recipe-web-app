require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 1337
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (err) {
        alert(err)
    }
}
start()