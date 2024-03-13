var express = require('express')
var router = express.Router()

// 프로필 이미지 변경
router.post('/profile_image', (req, res) => {
    Mysql.query(
        `
            update
                user_info
            set
                profile_image = ?
            where
                user_id = ?
        `,
        [
            req.body.params.image,
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

module.exports = router