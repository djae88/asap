var express = require('express')
var router = express.Router()

// 제품/솔루션 입력
router.post('/', (req, res) => {
    Mysql.query(
        `
            insert into
                solution_list
            (
                writer,
                category,
                title,
                content,
                attachment
            )values(
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `, 
        [
            req.body.params.writer,
            req.body.params.category,
            req.body.params.title,
            req.body.params.content,
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

// 제품/솔루션 스크랩하기
router.post('/scrap', (req, res) => {
    Mysql.query(
        `
            insert into
                solution_scrap_list
            (
                user_id,
                solution_id
            )values(
                ?,
                ?
            )
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