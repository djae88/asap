var express = require('express')
var router = express.Router()
var md5 = require('md5')

// 기존 아이디 list 불러오기 (중복 확인)
router.get('/user_id_search', (req, res) => {
    Mysql.query(
        `
            select
                user_id
            from
                user_info
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

// 기존 이메일 list 불러오기 (중복확인)
router.get('/email_search', (req, res) => {
    Mysql.query(
        `
            select
                email
            from
                user_info
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

// 가입하기
router.post('/insert', (req, res) => {
    Mysql.query(
        `
            insert into 
                user_info
            (
                user_id, 
                password, 
                email,
                status
            )values(
                ?,
                ?,
                ?,
                ?
            )
        `,
        [
            req.body.params.user_id,
            md5(req.body.params.password),
            req.body.params.email,
            req.body.params.status
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