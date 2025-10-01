<template>
    <div id="toss-complete-page">
        <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>결제 승인 처리 중...</p>
        </div>

        <div v-else-if="success" class="result-container success">
            <div class="icon-wrapper">
                <svg class="check-icon" viewBox="0 0 52 52">
                    <circle class="check-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="check-mark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <h1 class="title">결제가 완료되었습니다!</h1>
            <div class="payment-info">
                <div class="info-row">
                    <span class="label">주문번호</span>
                    <span class="value">{{ paymentData.orderId }}</span>
                </div>
                <div class="info-row">
                    <span class="label">상품명</span>
                    <span class="value">{{ paymentData.orderName }}</span>
                </div>
                <div class="info-row">
                    <span class="label">결제금액</span>
                    <span class="value price">{{ paymentData.amount ? paymentData.amount.toLocaleString() : 0 }}원</span>
                </div>
                <div class="info-row">
                    <span class="label">결제일시</span>
                    <span class="value">{{ formatDate(paymentData.approvedAt) }}</span>
                </div>
            </div>
            <button class="home-button" @click="goToHome">홈으로 돌아가기</button>
        </div>

        <div v-else class="result-container error">
            <div class="icon-wrapper">
                <svg class="error-icon" viewBox="0 0 52 52">
                    <circle class="error-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="error-cross" fill="none" d="M16 16 L36 36 M36 16 L16 36"/>
                </svg>
            </div>
            <h1 class="title">결제에 실패했습니다</h1>
            <p class="error-message">{{ errorMessage }}</p>
            <button class="retry-button" @click="goToPayment">다시 시도하기</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TossComplete',
    data() {
        return {
            loading: true,
            success: false,
            errorMessage: '',
            paymentData: {}
        }
    },
    mounted() {
        this.processPayment()
    },
    methods: {
        async processPayment() {
            const urlParams = new URLSearchParams(window.location.search)
            const paymentKey = urlParams.get('paymentKey')
            const orderId = urlParams.get('orderId')
            const amount = urlParams.get('amount')

            if (!paymentKey || !orderId || !amount) {
                this.loading = false
                this.success = false
                this.errorMessage = '결제 정보가 올바르지 않습니다.'
                return
            }

            try {
                const response = await fetch('/api/payment/confirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        paymentKey,
                        orderId,
                        amount
                    })
                })

                const result = await response.json()

                if (response.ok && result.success) {
                    this.success = true
                    this.paymentData = result.data
                } else {
                    this.success = false
                    this.errorMessage = result.message || '결제 승인에 실패했습니다.'
                }
            } catch (error) {
                this.success = false
                this.errorMessage = '결제 승인 중 오류가 발생했습니다.'
            } finally {
                this.loading = false
            }
        },

        formatDate(dateString) {
            if (!dateString) return '-'
            const date = new Date(dateString)
            return date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        },

        goToHome() {
            this.$router.push('/')
        },

        goToPayment() {
            this.$router.push('/toss')
        }
    }
}
</script>

<style scoped>
#toss-complete-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #f8f9fa;
}

.loading {
    text-align: center;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e9ecef;
    border-top: 4px solid #0064ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.result-container {
    background: white;
    padding: 50px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    text-align: center;
}

.icon-wrapper {
    margin-bottom: 30px;
}

.check-icon,
.error-icon {
    width: 80px;
    height: 80px;
}

.check-circle {
    stroke: #28a745;
    stroke-width: 2;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.check-mark {
    stroke: #28a745;
    stroke-width: 3;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

.error-circle {
    stroke: #dc3545;
    stroke-width: 2;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.error-cross {
    stroke: #dc3545;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 28;
    stroke-dashoffset: 28;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

.title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
}

.success .title {
    color: #28a745;
}

.error .title {
    color: #dc3545;
}

.payment-info {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e9ecef;
}

.info-row:last-child {
    border-bottom: none;
}

.label {
    font-size: 14px;
    color: #666;
}

.value {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.value.price {
    color: #0064ff;
    font-size: 20px;
    font-weight: bold;
}

.error-message {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
}

.home-button,
.retry-button {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
}

.home-button {
    background: #0064ff;
    color: white;
}

.home-button:hover {
    background: #0052cc;
}

.retry-button {
    background: #dc3545;
    color: white;
}

.retry-button:hover {
    background: #c82333;
}

@media (max-width: 576px) {
    .result-container {
        padding: 40px 20px;
    }

    .title {
        font-size: 24px;
    }

    .payment-info {
        padding: 20px;
    }
}
</style>
