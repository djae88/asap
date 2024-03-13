<template>
    <v-sheet class="pt-16 pb-16 rounded-10" color="#f9f9f9">
        <v-sheet class="px-8 py-16 mx-auto rounded-lg" width="480" outlined>
            <!-- 문구 -->
            <v-sheet color="transparent" width="400" class="mx-auto">
                <div class="d-flex mx-auto">
                    <v-img
                        height="40"
                        width="66"
                        contain
                        src="@/assets/logo/default.png"
                    ></v-img>
                </div>
                <p class="text-center text-subtitle-1 font-weight-medium mt-2 mb-0 grey--text text--darken-2">
                    익명의 견적받기 플랫폼
                </p>
                <p class="text-center text-caption grey--text text--darken-1">
                    견적이 필요한 모든 사람을 위해
                </p>
            </v-sheet>

            <!-- 로그인 -->
            <v-card-text>
                <v-text-field
                    class="mx-12"
                    outlined
                    flat
                    dense
                    v-model="user_id"
                    autofocus
                    color="primary"
                    placeholder="아이디"
                    @change="$v.user_id.$touch()"
                    @blur="$v.user_id.$touch()"
                    :error-messages="user_id_Errors"
                    @keyup.enter="submit()"
                >
                </v-text-field>
                <v-text-field
                    class="mx-12"
                    outlined
                    flat
                    dense
                    v-model="password"
                    color="primary"
                    placeholder="비밀번호"
                    type="password"
                    @change="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="password_Errors"
                    @keyup.enter="submit()"
                >
                </v-text-field>
            </v-card-text>
            <v-card-text class="px-16">
                <v-btn
                    class="font-weight-bold"
                    color="primary"
                    dark
                    block
                    large
                    depressed
                    @click="submit()"
                >
                    로그인
                </v-btn>
            </v-card-text>

            <!-- 버튼 -->
            <v-card-text class="d-flex justify-space-between px-16">
                <v-btn
                    width="90"
                    color="grey darken-1"
                    small
                    text
                    to="/auth/find/id"
                >
                    아이디 찾기
                </v-btn>
                <v-btn
                    width="90"
                    color="grey darken-1"
                    small
                    text
                    to="/auth/find/password"
                >
                    비밀번호 찾기
                </v-btn>
                <v-btn
                    width="90"
                    color="grey darken-1"
                    small
                    text
                    to="/auth/join/agree"
                >
                    회원가입
                </v-btn>
            </v-card-text>
        </v-sheet>
    </v-sheet>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
    mixins: [validationMixin],

    validations: {
        user_id: {
            required
        },
        password: {
            required
        }
    },

    data: () => ({
        user_id: "",
        password: ""
    }),

    computed: {
        user_id_Errors () {
            const errors = []
            if (!this.$v.user_id.$dirty) return errors
            !this.$v.user_id.required && errors.push('아이디를 입력해주세요')
            return errors
        },
        password_Errors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('비밀번호를 입력해주세요')
            return errors
        }
    },

    methods: {
        ...mapMutations(['login']),

        submit(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.$http.post("/api/auth/login", {
                    params: {
                        user_id: this.user_id,
                        password:this.password
                    }
                }).then((res) => {
                    if(!res.data[0]){
                        this.$http.post("/api/auth/login/temp_password/check", {
                            params: {
                                user_id: this.user_id,
                                password: this.password
                            }
                        }).then((res) => {
                            if(res.data.length){
                                // 로그인
                                this.$http.post("/api/auth/login/status_check", {
                                    params: {
                                        user_id: this.user_id,
                                    }
                                }).then((res2) => {
                                    if(!res2.data){
                                        alert("이메일 인증이 완료되지 않은 아이디입니다,\n이메일 인증을 완료 후 로그인해주세요.")
                                    }else{
                                        this.login(res.data[0])
                                        this.$router.push("/")
                                    }
                                })
                            }else{
                                alert("아이디 또는 비밀번호가 잘못되었습니다.")
                            }
                        })
                    }else{
                        this.$http.post("/api/auth/login/status_check", {
                            params: {
                                user_id: this.user_id,
                            }
                        }).then((res2) => {
                            if(!res2.data){
                                alert("이메일 인증이 완료되지 않은 아이디입니다,\n이메일 인증을 완료 후 로그인해주세요.")
                            }else{
                                this.login(res.data[0])
                                this.$router.push("/")
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>