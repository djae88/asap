var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')

// 메일 발송자
var transporter = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 465,
    auth: {
      user: 'romainsmtp',
      pass: 'romain7979!!@@'
    }
})

// 해당 메일로 가입한 계정이 있는지 확인
router.post('/search', (req, res) => {
    Mysql.query(
        `
            select
                *
            from
                user_info
            where
                email = ?
        `,
        [
            req.body.params.email
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

// 비밀번호 찾기 이메일 발송
router.post('/send', (req, res) => {
    // 임시 비밀번호 생성
    var temp_password = Math.random().toString(36).slice(-10)

    // 메일인증 DB에 입력
    Mysql.query(
        `
            insert into
                auth_temp_password
            (
                user_id,
                temp_password
            )values(
                ?,
                ?
            )
        `,
        [
            req.body.params.user_id,
            temp_password
        ],
        (err, rows) => {
            if (err) {
                console.log(err)
                console.log("Error : " + req.originalUrl)
                res.json(err);
            } else {
                console.log("Work! : " + req.originalUrl)
                res.json(rows)
            }
        }
    )

    // 메일 옵션
    var mailOptions = {
        from: '"ASAP"<romainsmtp@naver.com>',
        to: req.body.params.email,
        subject: "ASAP 임시 비밀번호 안내입니다",
        html: 
        `
            <table style="width:540px; margin:20px;">
                <tr>
                    <td style="border-top:4px solid #2196F3; padding-bottom:30px;">
                        <p style="font-size:24px; font-weight:bold; padding:20px 0px;"><font color="#2196F3">임시 비밀번호</font> 안내입니다.</p>
                        <p style="padding-top:30px; padding-bottom:40px;">
                            안녕하세요.<br/>
                            해당 이메일로 가입하신 아이디의 임시 비밀번호는 "`+temp_password+`" 입니다.<br/>
                            아래 <font color="#2196F3">'로그인'</font> 버튼을 클릭하여, 로그인 페이지로 이동하실 수 있습니다.<br/>
                            감사합니다.
                        </p>
                        <a href="http://a-sap.kr/auth/login">
                            <button type="button" style="background:#2196F3; border-radius:12px; height:40px; width:200px;">
                                <font color="white">로그인</font>
                            </button>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:1px solid #2196F3;">
                    </td>
                </tr>
            </table>
        `
    }
    
    // 메일 발송
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ' + info.response)
            res.send(true)
        }
    })
})

module.exports = router