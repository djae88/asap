var express = require('express')
var router = express.Router()

// 검색
router.post('/select/search', (req, res) => {
    let query = ''

    if(req.body.params.type == '유저 아이디')
    {
        query = "user_id like " + "'%"+req.body.params.keyword+"%'"
    }
    else if(req.body.params.type == '이메일 주소')
    {
        query = "email like " + "'%"+req.body.params.keyword+"%'"
    }

    Mysql.query(
        `
            select
                *,
                (select count(*) from estimate_request_list where writer = user_id) as estimate_request_count,
                0 as estimate_write_count,
                0 as solution_count
            from
                user_info
            where
                    type = '사용자'
                and
                ` + query + `
            order by
                created desc       
        `, 
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

// 이메일 인증 상태 변경하기
router.post('/update/status', function (req, res, next) {
    Mysql.query(
        `
            update
                user_info
            set
                status = ?
            where
                user_id = ?
        `,
        [
            req.body.params.status,
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

// 사용자 삭제
router.post('/delete', (req, res) => {
    Mysql.query(
        `
            delete from
                user_info
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

module.exports = router