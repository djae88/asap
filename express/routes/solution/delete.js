var express = require('express')
var router = express.Router()

// 제품/솔루션 삭제
router.post('/', (req, res) => {
    Mysql.query(
        `
            delete from
                solution_list
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

// 제품/솔루션 스크랩 삭제하기
router.post('/scrap', (req, res) => {
    Mysql.query(
        `
            delete from
                solution_scrap_list
            where
                    user_id = ?
                and
                    solution_id = ?
        `,
        [
            req.body.params.user_id,
            req.body.params.solution_id
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