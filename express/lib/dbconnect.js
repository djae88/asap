var mysql = require('mysql')

var Mysql = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

Mysql.connect(function (err) {
    if (err) {
        console.error('mysql connection error')
        console.error(err)
        throw err
    }
    console.log('mysql connected')
})

module.exports = Mysql