var express = require('express')
var router = express.Router()
const got = require('got')

// 토스페이먼츠 시크릿 키 (테스트 키)
const SECRET_KEY = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R' // 실제 테스트 시크릿 키로 교체 필요

/**
 * 결제 승인 API
 * 프론트엔드에서 결제창 완료 후 받은 paymentKey, orderId, amount를 받아
 * 토스페이먼츠 서버에 결제 승인 요청
 */
router.post('/confirm', async function(req, res) {
    try {
        const { paymentKey, orderId, amount } = req.body

        // 필수 파라미터 검증
        if (!paymentKey || !orderId || !amount) {
            return res.status(400).json({
                success: false,
                message: '필수 파라미터가 누락되었습니다.'
            })
        }

        // 토스페이먼츠 승인 API 호출
        const response = await got.post('https://api.tosspayments.com/v1/payments/confirm', {
            headers: {
                'Authorization': `Basic ${Buffer.from(SECRET_KEY + ':').toString('base64')}`,
                'Content-Type': 'application/json'
            },
            json: {
                paymentKey,
                orderId,
                amount: parseInt(amount)
            },
            responseType: 'json'
        })

        const payment = response.body

        // 결제 정보 DB 저장
        const insertQuery = `
            INSERT INTO toss_payments
            (payment_key, order_id, order_name, amount, status, method, customer_name, approved_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `

        Mysql.query(insertQuery, [
            payment.paymentKey,
            payment.orderId,
            payment.orderName,
            payment.totalAmount,
            payment.status,
            payment.method,
            payment.customerName || null,
            payment.approvedAt || null
        ], function(error, results) {
            if (error) {
                console.error('DB 저장 오류:', error)
                return res.status(500).json({
                    success: false,
                    message: 'DB 저장 중 오류가 발생했습니다.'
                })
            }

            res.json({
                success: true,
                message: '결제가 승인되었습니다.',
                data: {
                    orderId: payment.orderId,
                    orderName: payment.orderName,
                    amount: payment.totalAmount,
                    status: payment.status,
                    approvedAt: payment.approvedAt
                }
            })
        })

    } catch (error) {
        console.error('결제 승인 오류:', error)

        // 토스페이먼츠 API 에러 처리
        if (error.response && error.response.body) {
            const errorBody = error.response.body
            return res.status(error.response.statusCode || 500).json({
                success: false,
                message: errorBody.message || '결제 승인에 실패했습니다.',
                code: errorBody.code
            })
        }

        res.status(500).json({
            success: false,
            message: '결제 승인 중 오류가 발생했습니다.'
        })
    }
})

/**
 * 결제 내역 조회 API
 */
router.get('/:orderId', function(req, res) {
    const { orderId } = req.params

    const query = `
        SELECT * FROM toss_payments
        WHERE order_id = ?
    `

    Mysql.query(query, [orderId], function(error, rows) {
        if (error) {
            console.error('결제 내역 조회 오류:', error)
            return res.status(500).json({
                success: false,
                message: '결제 내역 조회 중 오류가 발생했습니다.'
            })
        }

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: '결제 내역을 찾을 수 없습니다.'
            })
        }

        res.json({
            success: true,
            data: rows[0]
        })
    })
})

/**
 * 결제 취소 API (옵션)
 */
router.post('/cancel', async function(req, res) {
    try {
        const { paymentKey, cancelReason } = req.body

        if (!paymentKey || !cancelReason) {
            return res.status(400).json({
                success: false,
                message: '필수 파라미터가 누락되었습니다.'
            })
        }

        // 토스페이먼츠 취소 API 호출
        const response = await got.post(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(SECRET_KEY + ':').toString('base64')}`,
                'Content-Type': 'application/json'
            },
            json: {
                cancelReason
            },
            responseType: 'json'
        })

        const payment = response.body

        // DB 상태 업데이트
        const updateQuery = `
            UPDATE toss_payments
            SET status = ?, canceled_at = NOW()
            WHERE payment_key = ?
        `

        Mysql.query(updateQuery, [payment.status, paymentKey], function(error, results) {
            if (error) {
                console.error('DB 업데이트 오류:', error)
                return res.status(500).json({
                    success: false,
                    message: 'DB 업데이트 중 오류가 발생했습니다.'
                })
            }

            res.json({
                success: true,
                message: '결제가 취소되었습니다.',
                data: {
                    paymentKey: payment.paymentKey,
                    status: payment.status
                }
            })
        })

    } catch (error) {
        console.error('결제 취소 오류:', error)

        if (error.response && error.response.body) {
            const errorBody = error.response.body
            return res.status(error.response.statusCode || 500).json({
                success: false,
                message: errorBody.message || '결제 취소에 실패했습니다.',
                code: errorBody.code
            })
        }

        res.status(500).json({
            success: false,
            message: '결제 취소 중 오류가 발생했습니다.'
        })
    }
})

module.exports = router
