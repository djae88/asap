var express = require('express')
var router = express.Router()

// 특정 유저 불러오기
router.post('/select/specific', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                user_info
            where
                user_id = ?
        `, 
        [
            req.body.params.user_id
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