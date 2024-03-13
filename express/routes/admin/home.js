var express = require('express')
var router = express.Router()

// 순서 변경
router.post('/update/arrange', (req, res) => {
    Mysql.query(
        `
            update
                home_arrange_type
            set
                arrange = ?
            where
                list = ?
        `,
        [
            req.body.params.arrange,
            req.body.params.list
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