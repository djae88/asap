var express = require('express')
var router = express.Router()

// 관리자 로그인
router.use('/auth', require('./admin/auth'))

// 배너 관리
router.use('/banner', require('./admin/banner'))

// 홈 관리
router.use('/home', require('./admin/home'))

// 관리자 정보수정
router.use('/update', require('./admin/update'))

// 회원 관리
router.use('/user', require('./admin/user'))

module.exports = router