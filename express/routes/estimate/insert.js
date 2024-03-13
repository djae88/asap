var express = require('express')
var router = express.Router()

// 견적요청 입력
router.post('/', (req, res) => {
    Mysql.query(
        `
            insert into
                estimate_list
            (
                estimate_request_id,
                writer,
                requestor,
                provider_company,
                provider_address,
                provider_phone,
                estimate_product_name,
                estimate_amount,
                estimate_price,
                estimate_total,
                condition_pay_date,
                condition_validity,
                condition_option
            )values(
                ?,
                ?,
                ?,
                ?,
                ?,
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
            req.body.params.estimate_request_id,
            req.body.params.writer,
            req.body.params.requestor,
            req.body.params.provider_company,
            req.body.params.provider_address,
            req.body.params.provider_phone,
            req.body.params.estimate_product_name,
            req.body.params.estimate_amount,
            req.body.params.estimate_price,
            req.body.params.estimate_total,
            req.body.params.condition_pay_date,
            req.body.params.condition_validity,
            req.body.params.condition_option
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