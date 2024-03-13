var express = require('express')
var router = express.Router()
var md5 = require('md5')

// 관리자 불러오기
router.post('/load', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                admin_list
        `,
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

// 관리자 수정 제출하기
router.post('/submit', (req, res) => {
    Mysql.query(
        `
            update
                admin_list
            set
                password = ?
            where
                user_id = ?
        `,
        [
            md5(req.body.params.password),
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