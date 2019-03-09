const express = require('express')
const app = express()
const mysql = require('mysql')

require('dotenv').config()

const port = process.env.CHIRPER_PORT

const connection = mysql.createConnection({
    host     : process.env.CHIRPER_DB_HOST,
    user     : process.env.CHIRPER_DB_USER,
    password : process.env.CHIRPER_DB_PASS,
    database : process.env.CHIRPER_DB_NAME
})

connection.query("INSERT INTO chirps (content) VALUES ('Hello');", (_, results, fields) => {
    console.log(results)
})
connection.query('SELECT * FROM chirps;', (_, results, fields) => {
    console.log(results)
})

app.use(express.static('public'))

app.listen(port, () => console.log(`The Chirper server is listening on port ${port}.`))
