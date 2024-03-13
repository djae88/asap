var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')

// 이메일 보내기
router.post('/send', (req, res) => {
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

    // 인증번호 생성
    var serial = Math.random().toString(36).slice(-10)

    // 메일인증 DB에 입력
    Mysql.query(
        `
            insert into
                email_certification
            (
                user_id,
                serial
            )values(
                ?,
                ?
            )
        `,
        [
            req.body.params.user_id,
            serial
        ],
        (err, rows) => {
            if (err) {
                console.log(err);
                console.log("Error : " + req.originalUrl);
                res.json(err);
            } else {
                console.log("Work! : " + req.originalUrl);
                res.json(rows);
            }
        }
    )

    // 메일 옵션
    var mailOptions = {
        from: '"ASAP"<romainsmtp@naver.com>',
        to: req.body.params.email,
        subject: "ASAP 메일인증 안내입니다",
        html: 
        `
            <table style="width:540px; margin:20px;">
                <tr>
                    <td style="border-top:4px solid #2196F3; padding-bottom:30px;">
                        <p style="font-size:24px; font-weight:bold; padding:20px 0px;"><font color="#2196F3">ASAP 메일인증</font> 안내입니다.</p>
                        <p style="padding-top:30px; padding-bottom:40px;">
                            안녕하세요.<br/>
                            가입해 주셔서 진심으로 감사드립니다.<br/>
                            아래 <font color="#2196F3">'메일 인증'</font> 버튼을 클릭하여, 회원가입을 완료해 주세요.<br/>
                            감사합니다.
                        </p>
                        <a href="http://a-sap.kr/auth/email_certification?user_id=`+req.body.params.user_id+`&serial=`+serial+`" style="text-decoration:none !important; color:white;">
                            <div style="background:#2196F3; border-radius:12px; padding:4px 0; width:200px; text-decoration:none !important; text-align:center;">
                                <p color="white" style="margin:10px auto; font-weight:medium; text-decoration:none !important; font-size:16px;">메일 인증</p>
                            </div>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:1px solid #2196F3;">
                        <p style="font-size:12px; padding-top:4px;">
                            만약 버튼이 정상적으로 클릭되지 않는다면, 아래 링크를 복사하여 접속해주세요.<br/>
                            http://a-sap.kr/auth/email_certification?user_id=`+req.body.params.user_id+`&serial=`+serial+`
                        </p>
                    </td>
                </tr>
            </table>
        `
    };
    
    // 메일 발송
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
})

// 메일 인증 DB에 있는 지 확인
router.post('/certification/check', function (req, res) {
    Mysql.query(
        `
            select
                *
            from
                email_certification
            where
                    user_id = ?
                and
                    serial = ?
        `,
        [
            req.body.params.user_id,
            req.body.params.serial
        ],
        (err, rows) => {
            if (err) {
                console.log(err);
                console.log("Error : " + req.originalUrl)
                res.json(err);
            } else {
                console.log("Work! : " + req.originalUrl)
                res.json(rows);
            }
        }
    )
})

// 인증완료 처리
router.post('/status/update', function (req, res) {
    Mysql.query(
        `
            update
                user_info
            set
                status = '인증완료'
            where
                user_id = ?
        `,
        [
            req.body.params.user_id
        ],
        (err, rows) => {
            if (err) {
                console.log(err);
                console.log("Error : " + req.originalUrl)
                res.json(err);
            } else {
                console.log("Work! : " + req.originalUrl)
                res.json(rows);
            }
        }
    )
})

// 메일 인증에 사용한 값 destroy
router.post('/certification/destroy', function (req, res) {
    Mysql.query(
        `
            delete from
                email_certification
            where
                    user_id = ?
                and
                    serial = ?
        `,
        [
            req.body.params.user_id,
            req.body.params.serial
        ],
        (err, rows) => {
            if (err) {
                console.log(err);
                console.log("Error : " + req.originalUrl)
                res.json(err);
            } else {
                console.log("Work! : " + req.originalUrl)
                res.json(rows);
            }
        }
    )
})

module.exports = router