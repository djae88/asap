var express = require('express')
var router = express.Router()
var md5 = require('md5')

// 로그인
router.post('/', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                user_info
            where
                    user_id = ?
                and
                    password = ?
        `,
        [
            req.body.params.user_id,
            md5(req.body.params.password)
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

// 이메일 인증 여부 확인
router.post('/status_check', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                user_info
            where
                    user_id = ?
                and
                    status = '인증완료'
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
                if (rows.length == 0) {
                    res.send(false)
                } else {
                    res.send(true)
                }
            }
        }
    )
})

// 임시 비밀번호 확인
router.post('/temp_password/check', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                auth_temp_password
            where
                    user_id = ?
                and
                    temp_password = ?
        `,
        [
            req.body.params.user_id,
            req.body.params.password
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