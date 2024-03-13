var express = require('express')
var router = express.Router()

// 견적요청 수정하기 (썸네일, 첨부파일 포함)
router.post('/thumbnail/attachment', (req, res) => {
    Mysql.query(
        `
            update
                estimate_request_list
            set
                writer = ?,
                product_name = ?,
                amount = ?,
                pay_date = ?,
                deadline = ?,
                memo = ?,
                thumbnail = ?,
                attachment = ?
            where
                id = ?
        `, 
        [
            req.body.params.writer,
            req.body.params.product_name,
            req.body.params.amount,
            req.body.params.pay_date,
            req.body.params.deadline,
            req.body.params.memo,
            req.body.params.thumbnail,
            req.body.params.attachment,
            req.body.params.id,
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

// 견적요청 수정하기 (썸네일 포함)
router.post('/thumbnail', (req, res) => {
    Mysql.query(
        `
            update
                estimate_request_list
            set
                writer = ?,
                product_name = ?,
                amount = ?,
                pay_date = ?,
                deadline = ?,
                memo = ?,
                thumbnail = ?
            where
                id = ?
        `, 
        [
            req.body.params.writer,
            req.body.params.product_name,
            req.body.params.amount,
            req.body.params.pay_date,
            req.body.params.deadline,
            req.body.params.memo,
            req.body.params.thumbnail,
            req.body.params.id,
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

// 견적요청 수정하기 (첨부파일 포함)
router.post('/attachment', (req, res) => {
    Mysql.query(
        `
            update
                estimate_request_list
            set
                writer = ?,
                product_name = ?,
                amount = ?,
                pay_date = ?,
                deadline = ?,
                memo = ?,
                attachment = ?
            where
                id = ?
        `, 
        [
            req.body.params.writer,
            req.body.params.product_name,
            req.body.params.amount,
            req.body.params.pay_date,
            req.body.params.deadline,
            req.body.params.memo,
            req.body.params.attachment,
            req.body.params.id,
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

// 견적요청 수정하기
router.post('/', (req, res) => {
    Mysql.query(
        `
            update
                estimate_request_list
            set
                writer = ?,
                product_name = ?,
                amount = ?,
                pay_date = ?,
                deadline = ?,
                memo = ?
            where
                id = ?
        `, 
        [
            req.body.params.writer,
            req.body.params.product_name,
            req.body.params.amount,
            req.body.params.pay_date,
            req.body.params.deadline,
            req.body.params.memo,
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

// 견적요청 카테고리 변경하기
router.post('/category', (req, res) => {
    Mysql.query(
        `
            update
                estimate_request_list
            set
                category = ?
            where
                id = ?
        `, 
        [
            req.body.params.category,
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

module.exports = router