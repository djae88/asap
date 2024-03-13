var express = require('express')
var router = express.Router()

// 견적요청 삭제
router.post('/', (req, res) => {
    Mysql.query(
        `
            delete from
                estimate_list
            where
                id = ?
        `, 
        [
            req.body.params.id
        ],
        (err, rows) => {
            if (err) {
                console.log(err)
                console.log("Error : " + req.originalUrl)
                res.json(err)
            } else {
                console.log("Work! : " + req.originalUrl)
                res.json(rows)
            }
        }
    )
})
module.exports = router