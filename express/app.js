// 미들웨어
const createError = require('http-errors')
const express = require('express')
var app = express()
const path = require('path')
const logger = require('morgan')
const history = require('connect-history-api-fallback')
global.Mysql = require('./lib/dbconnect')
app.use(history())

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '150mb' }))
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '150mb',
    extended: true
}))

// Routes
app.use('/api/admin', require('./routes/admin'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/estimate_request', require('./routes/estimate_request'))
app.use('/api/estimate', require('./routes/estimate'))
app.use('/api/file', require('./routes/file'))
app.use('/api/message', require('./routes/message'))
app.use('/api/solution', require('./routes/solution'))
app.use('/api/user', require('./routes/user'))

// 마이페이지
app.use('/api/mypage/summary', require('./routes/mypage/summary'))
app.use('/api/mypage/update', require('./routes/mypage/update'))

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page w
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app