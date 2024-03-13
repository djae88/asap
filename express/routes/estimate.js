var express = require('express')
var router = express.Router()

router.use('/delete', require('./estimate/delete'))
router.use('/insert', require('./estimate/insert'))
router.use('/select', require('./estimate/select'))
router.use('/update', require('./estimate/update'))

module.exports = router