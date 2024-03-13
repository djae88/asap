<template>
    <v-sheet class="pt-16 pb-16 rounded-10" color="#f9f9f9">
        <v-sheet class="px-8 py-16 mx-auto rounded-lg" width="480" outlined>
            <!-- 상단 -->
            <v-sheet color="transparent" width="400" class="mx-auto">
                <div class="d-flex mx-auto">
                    <v-img
                        height="40"
                        width="66"
                        contain
                        src="@/assets/logo/default.png"
                    ></v-img>
                </div>
                <p class="text-center text-subtitle-1 font-weight-medium mt-2 grey--text text--darken-2">
                    비밀번호 찾기
                </p>
            </v-sheet>

            <!-- 입력 -->
            <v-card-text>
                <v-text-field
                    class="mx-14"
                    outlined
                    flat
                    dense
                    v-model="email"
                    autofocus
                    hide-details
                    color="blue"
                    placeholder="이메일"
                    @keyup.enter="submit()"
                >
                </v-text-field>
                <p class="text-caption text-center mt-2 mb-0">
                    가입 시 입력하신 이메일로 임시 비밀번호 발송해드립니다
                </p>
            </v-card-text>

            <!-- 발송 -->
            <v-card-text class="px-14">
                <v-btn
                    class="font-weight-bold"
                    color="blue"
                    dark
                    block
                    large
                    depressed
                    @click="submit()"
                >
                    이메일 발송
                </v-btn>
            </v-card-text>

            <!-- 버튼 -->
            <v-card-text class="d-flex justify-center">
                <v-btn to="/auth/login" small text color="grey darken-1" class="mr-1">로그인으로 돌아가기</v-btn>
                <v-btn to="/auth/find/id" small text color="grey darken-1">아이디 찾기</v-btn>
            </v-card-text>
        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        email: ""
    }),

    methods: {
        submit(){
            // 이메일로 회원 찾기
            this.$http.post('/api/auth/find_password/search', {
                params: {
                    email: this.email
                }
            }).then((res) => {
                if(!res.data.length){
                    alert("해당 이메일로 가입된 회원이 없습니다.")
                }else{
                    // 이메일 발송
                    this.$http.post('/api/auth/find_password/send', {
                        params: {
                            email: this.email,
                            user_id: res.data[0].user_id
                        }
                    }).then((res) => {
                        if(res.data){
                            alert("임시 비멀번호 이메일이 정상적으로 발송되었습니다.")
                        }
                    })
                }
            })
        }
    }
}
</script>