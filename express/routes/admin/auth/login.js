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
                admin_list
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

module.exports = router