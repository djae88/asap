var express = require('express')
var router = express.Router()

// 견적요청 삭제
router.post('/', (req, res) => {
    Mysql.query(
        `
            delete from
                estimate_request_list
            where
                id = ?
        `, 
        [
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

// 견적요청 스크랩 삭제하기
router.post('/scrap', (req, res) => {
    Mysql.query(
        `
            delete from
                estimate_request_scrap_list
            where
                    user_id = ?
                and
                    estimate_request_id = ?
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