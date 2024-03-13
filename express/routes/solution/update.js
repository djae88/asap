var express = require('express')
var router = express.Router()

// 제품/솔루션 수정하기
router.post('/', (req, res) => {
    Mysql.query(
        `
            update
                solution_list
            set
                writer = ?,
                category = ?,
                title = ?,
                content = ?,
                attachment = ?
            where
                id = ?
        `, 
        [
            req.body.params.writer,
            req.body.params.category,
            req.body.params.title,
            req.body.params.content,
            req.body.params.attachment,
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