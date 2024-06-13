require('dotenv').config()

const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const router = require('./routers')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})