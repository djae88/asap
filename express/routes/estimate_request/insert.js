var express = require('express')
var router = express.Router()

// 견적요청 입력
router.post('/', (req, res) => {
    Mysql.query(
        `
            insert into
                estimate_request_list
            (
                writer,
                product_name,
                amount,
                pay_date,
                deadline,
                memo,
                thumbnail,
                attachment
            )values(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `, 
        [
            req.body.params.writer,
            req.body.params.product_name,
            req.body.params.amount,
            req.body.params.pay_date,
            req.body.params.deadline,
            req.body.params.memo,
            req.body.params.thumbnail,
            req.body.params.attachment
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

// 견적요청 스크랩하기
router.post('/scrap', (req, res) => {
    Mysql.query(
        `
            insert into
                estimate_request_scrap_list
            (
                user_id,
                estimate_request_id
            )values(
                ?,
                ?
            )
        `,
        [
            req.body.params.user_id,
            req.body.params.estimate_request_id
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