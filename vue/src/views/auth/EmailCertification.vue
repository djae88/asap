<template>
    <v-sheet class="pt-16 pb-16 rounded-10" color="#f9f9f9">
        <v-sheet class="px-8 py-16 mx-auto rounded-lg" width="480" outlined>
            <!-- 문구 -->
            <v-sheet color="transparent" width="400" class="mb-10 mx-auto">
                <div class="d-flex mx-auto">
                    <v-img
                        height="40"
                        width="66"
                        contain
                        src="@/assets/logo/default.png"
                    ></v-img>
                </div>
                <p class="text-center text-subtitle-1 font-weight-medium mt-2 mb-0 grey--text text--darken-2">
                    이메일 인증
                </p>
            </v-sheet>

            <!-- 인증 실패시 -->
            <v-sheet
                v-if="!cert"
                class="text-center"
            >
                <!-- 아이콘 -->
                <v-icon
                    size="80"
                    color="red"
                    class="ml-3"
                >
                    mdi-email-alert-outline
                </v-icon>

                <!-- 문구 -->
                <p class="my-4 font-weight-bold grey--text">
                    이메일 인증코드가 만료되었거나<br/>
                    이미 인증을 완료된 계정입니다.
                </p>

                <p class="mb-6 text-body-2 font-weight-bold red--text">
                    반복될 시 고객센터로 문의바랍니다.
                </p>
            </v-sheet>

            <!-- 인증 성공시 -->
            <v-sheet
                v-if="cert"
                class="text-center"
            >
                <!-- 아이콘 -->
                <v-icon
                    size="80"
                    color="primary"
                >
                    mdi-email-check-outline
                </v-icon>

                <!-- 문구 -->
                <p class="mt-4 font-weight-bold grey--text text--darken-2">
                    이메일 인증이 완료되었습니다.<br/>
                    회원가입을 축하합니다.
                </p>
            </v-sheet>

            <v-card-text class="px-16">
                <v-btn
                    class="font-weight-bold"
                    color="primary"
                    dark
                    block
                    large
                    depressed
                    to="/auth/login"
                >
                    로그인 하러가기
                </v-btn>
            </v-card-text>
        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        cert: false
    }),

    mounted(){
        // 이메일 인증 check
        this.$http.post('/api/auth/email/certification/check', {
            params: {
                user_id: this.$route.query.user_id,
                serial: this.$route.query.serial
            }
        }).then((res) => {
            // 값이 없을을 경우
            if(!res.data.length){
                this.cert = false
            // 값이 있을 경우
            }else{
                // 유저 status '인증완료'로 Update
                this.$http.post('/api/auth/email/status/update', {
                    params: {
                        user_id: this.$route.query.user_id
                    }
                }).then((res) => {
                    if(res.data.affectedRows){
                        this.cert = true

                        // 포인트 내역 기록
                        this.$http.post('/api/admin/pointmall/order/accept/point_list/add', {
                            params: {
                                user_id: this.$route.query.user_id,
                                title: "회원가입을 축하합니다",
                                menu: '회원가입',
                                activity: '이메일인증',
                                pay_point: 100,
                            }
                        })

                        // 이메일 인증 완료한 값 destroy
                        this.$http.post('/api/auth/email/certification/destroy', {
                            params: {
                                user_id: this.$route.query.user_id,
                                serial: this.$route.query.serial
                            }
                        })
                    }
                })
            }
        })
    }
}
</script>