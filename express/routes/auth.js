var express = require('express')
var router = express.Router()

router.use('/email', require('./auth/email'))
router.use('/find_id', require('./auth/find_id'))
router.use('/find_password', require('./auth/find_password'))
router.use('/join', require('./auth/join'))
router.use('/login', require('./auth/login'))

module.exports = router