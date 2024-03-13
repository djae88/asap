var express = require('express')
var router = express.Router()

router.use('/insert', require('./message/insert'))
router.use('/select', require('./message/select'))

module.exports = router