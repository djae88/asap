var express = require('express')
var router = express.Router()

router.use('/login', require('./auth/login'))

module.exports = router