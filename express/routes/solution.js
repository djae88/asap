var express = require('express')
var router = express.Router()

router.use('/delete', require('./solution/delete'))
router.use('/insert', require('./solution/insert'))
router.use('/select', require('./solution/select'))
router.use('/update', require('./solution/update'))

module.exports = router