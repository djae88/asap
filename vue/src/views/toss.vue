<template>
    <div id="toss-payment-page">
        <!-- 상품 상세 -->
        <div class="product-detail">
            <div class="product-image">
                <img src="@/assets/sample2.jpg" alt="테스트 상품">
            </div>
            <div class="product-info">
                <h1 class="product-name">{{ product.name }}</h1>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-price">
                    <span class="price-label">가격:</span>
                    <span class="price-value">{{ product.price.toLocaleString() }}원</span>
                </div>
                <button class="payment-button" @click="requestPayment">결제하기</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'TossPayment',
    data() {
        return {
            product: {
                name: '테스트 상품',
                description: '토스페이먼츠 결제 연동 테스트를 위한 가상 상품입니다. 실제 결제는 진행되지 않으며, 테스트 API를 통해 결제 프로세스를 체험할 수 있습니다.',
                price: 50000
            },
            tossPayments: null,
            clientKey: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq' // 테스트 클라이언트 키 (실제 키로 교체 필요)
        }
    },
    mounted() {
        this.loadTossPaymentsScript()
    },
    methods: {
        loadTossPaymentsScript() {
            // 토스페이먼츠 SDK 로드
            const script = document.createElement('script')
            script.src = 'https://js.tosspayments.com/v1/payment'
            script.onload = () => {
                this.tossPayments = window.TossPayments(this.clientKey)
            }
            document.head.appendChild(script)
        },

        async requestPayment() {
            if (!this.tossPayments) {
                alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
                return
            }

            // 주문 ID 생성 (유니크해야 함)
            const orderId = 'ORDER_' + new Date().getTime()

            try {
                await this.tossPayments.requestPayment('카드', {
                    amount: this.product.price,
                    orderId: orderId,
                    orderName: this.product.name,
                    customerName: '테스트 고객',
                    successUrl: window.location.origin + '/toss-complete',
                    failUrl: window.location.origin + '/toss-complete'
                })
            } catch (error) {
                if (error.code === 'USER_CANCEL') {
                    // 사용자가 결제를 취소한 경우
                    console.log('결제가 취소되었습니다.')
                } else {
                    console.error('결제 중 오류:', error)
                    alert('결제 중 오류가 발생했습니다.')
                }
            }
        }
    }
}
</script>

<style scoped>
#toss-payment-page {
    max-width: 1000px;
    margin: 50px auto;
    padding: 20px;
}

.product-detail {
    display: flex;
    gap: 40px;
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-image {
    flex-shrink: 0;
}

.product-image img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-name {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.product-description {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;
}

.product-price {
    margin-top: auto;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.price-label {
    font-size: 16px;
    color: #666;
    margin-right: 10px;
}

.price-value {
    font-size: 32px;
    font-weight: bold;
    color: #0064ff;
}

.payment-button {
    width: 100%;
    padding: 18px;
    background: #0064ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
}

.payment-button:hover {
    background: #0052cc;
}

.payment-button:active {
    background: #003d99;
}

.payment-message {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-size: 16px;
}

.payment-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.payment-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
    .product-detail {
        flex-direction: column;
    }

    .product-image img {
        width: 100%;
        height: auto;
    }

    .product-name {
        font-size: 24px;
    }

    .price-value {
        font-size: 28px;
    }
}
</style>