var express = require('express')
var router = express.Router()

// 메세지 목록
router.post('/list', (req, res) => {
    Mysql.query(
        `
            select
                *
            from    
                message_list
            where
                    (sender = ? and receiver = ?)
                or
                    (receiver = ? and sender = ?)
            order by
                created asc
        `, 
        [
            req.body.params.talk_user,
            req.body.params.user_id,
            req.body.params.talk_user,
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

// 채널 목록 (내가 보낸)
router.post('/channel/list/me/send', (req, res) => {
    Mysql.query(
        `
            select 
                distinct receiver, created
            from 
                message_list
            where
                sender = ?
            order by
                created desc
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

// 채널 목록 (내가 받은)
router.post('/channel/list/me/recieve', (req, res) => {
    Mysql.query(
        `
            select 
                distinct sender, created
            from 
                message_list
            where
                receiver = ?
            order by
                created desc
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

router.post('/channel/list/detailForList', (req, res) => {
    Mysql.query(
        `
            select
                *,
                ? as talk_user
            from 
                message_list
            where
                    (sender = ? and receiver = ?)
                or
                    (receiver = ? and sender = ?)
            order by
                created desc
        `,
        [
            req.body.params.other,
            req.body.params.me,
            req.body.params.other,
            req.body.params.me,
            req.body.params.other
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