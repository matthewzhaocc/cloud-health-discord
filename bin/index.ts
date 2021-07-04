import express from 'express'
import morgan from 'morgan'
import handler from '../api/handler'

const app = express()
app.use(morgan('common'))
app.use("/", handler())

app.listen(process.env.PORT || 3000, () => {
    console.log(`application listening on port ${process.env.PORT || 3000}`)
})