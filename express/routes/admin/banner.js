var express = require('express')
var router = express.Router()

// 배너 조회
router.post('/import', (req, res) => {
    Mysql.query(
        `
            select 
                * 
            from 
                banner
            where 
                type = ?
        `,
        [
            req.body.params.type
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

// 배너 수정하기 (링크만)
router.post('/update/link', (req, res) => {
    Mysql.query(
        `
            update 
                banner 
            set 
                link = ?
            where 
                type = ?
        `,
        [
            req.body.params.link,
            req.body.params.type
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

// 배너 수정하기 (이미지, 링크)
router.post('/update/both', (req, res) => {
    Mysql.query(
        `
            update 
                banner 
            set 
                banner_image = ?,
                link = ?
            where 
                type = ?
        `,
        [
            req.body.params.image,
            req.body.params.link,
            req.body.params.type
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