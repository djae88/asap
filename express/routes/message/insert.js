var express = require('express')
var router = express.Router()

// 채팅 입력
router.post('/', (req, res) => {
    Mysql.query(
        `
            insert into
                message_list
            (
                type,
                sender,
                receiver,
                content,
                image,
                attachment,
                estimate_id
            )values(
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
            req.body.params.type,
            req.body.params.sender,
            req.body.params.receiver,
            req.body.params.content,
            req.body.params.image,
            req.body.params.attachment,
            req.body.params.estimate_id
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