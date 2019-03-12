const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.CHIRPER_PORT

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(port, () => console.log(`The Chirper server is listening on port ${port}.`))
