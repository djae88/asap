var express = require('express')
var router = express.Router()
const path = require('path')
var multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let env = ""
            if(process.env.NODE_ENV == 'development'){
                env = "../vue/"
            }

            // TIPTAP 이미지
            if(req.query.type == 'board')
            {
                cb(null, env+"public/upload/board/")
            }

            // 견적요청 > 썸네일
            else if(req.query.type == 'thumbnail')
            {
                cb(null, env+"public/upload/estimate/thumbnail/")
            }

            // 견적요청 > 첨부파일
            else if(req.query.type == 'attachment')
            {
                cb(null, env+"public/upload/estimate/attachment/")
            }

            // 제품/솔루션 > 첨부파일
            else if(req.query.type == 'solution/attachment')
            {
                cb(null, env+"public/upload/solution/attachment/")
            }

            // 배너
            else if(req.query.type == 'banner')
            {
                cb(null, env+"public/upload/banner/")
            }
        },

        filename: function (req, file, cb) {
            let extension = path.extname(file.originalname)
            let basename = path.basename(file.originalname, extension)
            cb(null, basename + "-" + Date.now() + extension)
        }
    })
})

router.post('/upload', upload.single('image'), (req, res) => {
    res.send(req.file.filename)
})

// 파일 다운로드
router.post('/download', (req, res) => {
    var file = ""
    if(process.env.NODE_ENV == 'development')
    {
        file = path.join(__dirname, '../../vue/public/upload/estimate/attachment/' + req.body.params.file)
    }
    else if(process.env.NODE_ENV == 'production')
    {
        file = path.join(__dirname, '../public/upload/estimate/attachment/' + req.body.params.file)
    }
    res.sendFile(file)
})

// 파일 다운로드
router.post('/download/solution', (req, res) => {
    var file = ""
    if(process.env.NODE_ENV == 'development')
    {
        file = path.join(__dirname, '../../vue/public/upload/solution/attachment/' + req.body.params.file)
    }
    else if(process.env.NODE_ENV == 'production')
    {
        file = path.join(__dirname, '../public/upload/solution/attachment/' + req.body.params.file)
    }
    res.sendFile(file)
})

module.exports = router