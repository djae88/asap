var express = require('express')
var router = express.Router()

router.use('/delete', require('./estimate_request/delete'))
router.use('/insert', require('./estimate_request/insert'))
router.use('/select', require('./estimate_request/select'))
router.use('/update', require('./estimate_request/update'))

module.exports = router