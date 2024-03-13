var express = require('express')
var router = express.Router()

// 전체 견적요청 불러오기
router.post('/list', (req, res) => {
    Mysql.query(
        `
            select
                *,
                (select count(*) from estimate_request_scrap_list where user_id = ? and estimate_request_id = estimate_request_list.id) as is_scraped
            from
                estimate_request_list
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

// 견적요청 검색하기
router.post('/search', (req, res) => {
    Mysql.query(
        `
            select
                *,
                (select count(*) from estimate_request_scrap_list where user_id = ? and estimate_request_id = estimate_request_list.id) as is_scraped
            from
                estimate_request_list
            where
                    CONCAT(product_name, amount, pay_date, deadline, memo) LIKE ?
                and
                    category like ?
                and
                    product_name like ?
                and
                    amount like ?
                and
                    pay_date like ?
                and
                    deadline like ?
            order by
                created desc
        `,
        [
            req.body.params.user_id,
            "%" + req.body.params.total + "%",
            "%" + req.body.params.category + "%",
            "%" + req.body.params.product_name + "%",
            "%" + req.body.params.amount + "%",
            "%" + req.body.params.pay_date + "%",
            "%" + req.body.params.deadline + "%",
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

// 특정 작성자의 전체 견적요청 불러오기
router.post('/writer', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                estimate_request_list
            where
                writer = ?
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

// 특정 작성자의 전체 견적요청 스크랩 불러오기
router.post('/writer/scraped', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                estimate_request_scrap_list
                    join estimate_request_list on estimate_request_scrap_list.estimate_request_id = estimate_request_list.id
            where
                user_id = ?
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

// 특정 견적요청 불러오기
router.post('/specific', (req, res) => {
    Mysql.query(
        `
            select
                *,
                (select count(*) from estimate_request_scrap_list where user_id = ? and estimate_request_id = estimate_request_list.id) as is_scraped
            from
                estimate_request_list
            where
                id = ?
        `,
        [
            req.body.params.user_id,
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