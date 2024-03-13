var express = require('express')
var router = express.Router()

// 특정 견적작성 불러오기
router.post('/specific', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
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

// 특정 사용자의 전체 견적작성 불러오기
router.post('/writer', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                estimate_list
            where
                writer = ?
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