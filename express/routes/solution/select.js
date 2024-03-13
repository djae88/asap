var express = require('express')
var router = express.Router()

// 전체 제품/솔루션 불러오기
router.post('/list', (req, res) => {
    Mysql.query(
        `
            select
                *,
                (select count(*) from solution_scrap_list where user_id = ? and solution_id = solution_list.id) as is_scraped,
                "/upload/board/default.png" as image,
                CONVERT(content USING utf8) as content
            from
                solution_list
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

// 제품/솔루션 검색하기
router.post('/search', (req, res) => {
    Mysql.query(
        `
            select
                *,
                (select count(*) from solution_scrap_list where user_id = ? and solution_id = solution_list.id) as is_scraped,
                "/upload/board/default.png" as image,
                CONVERT(content USING utf8) as content
            from
                solution_list
            where
                    CONCAT(writer, category, title, content) LIKE ?
                and
                    category like ?
                and
                    title like ?
                and
                    content like ?
            order by
                created desc
        `,
        [
            req.body.params.user_id,
            "%" + req.body.params.total + "%",
            "%" + req.body.params.category + "%",
            "%" + req.body.params.title + "%",
            "%" + req.body.params.content + "%",
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

// 특정 작성자의 전체 제품/솔루션 불러오기
router.post('/writer', (req, res) => {
    Mysql.query(
        `
            select
                *,
                "/upload/board/default.png" as image,
                CONVERT(content USING utf8) as content
            from
                solution_list
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

// 특정 작성자의 전체 제품/솔루션 스크랩 불러오기
router.post('/writer/scraped', (req, res) => {
    Mysql.query(
        `
            select
                *,
                "/upload/board/default.png" as image,
                CONVERT(content USING utf8) as content
            from
                solution_scrap_list
                    join solution_list on solution_scrap_list.solution_id = solution_list.id
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

// 특정 제품/솔루션 불러오기
router.post('/specific', (req, res) => {
    Mysql.query(
        `
            select
                *,
                (select count(*) from solution_scrap_list where user_id = ? and solution_id = solution_list.id) as is_scraped,
                CONVERT(content USING utf8) as content
            from
                solution_list
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