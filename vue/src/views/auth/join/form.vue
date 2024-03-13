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
                    회원가입
                </p>
            </v-sheet>

            <!-- 입력 -->
            <v-sheet
                :width="$vuetify.breakpoint.mobile? '94%':420"
                class="mt-8 mx-auto"
            >
                <!-- 아이디 -->
                <v-text-field
                    class="mb-3"
                    :class="$vuetify.breakpoint.mobile? '':'mx-16'"
                    outlined
                    v-model="user_id"
                    label="아이디"
                    persistent-placeholder
                    @change="$v.user_id.$touch()"
                    @blur="$v.user_id.$touch()"
                    :error-messages="user_id_Errors"
                ></v-text-field>

                <!-- 비밀번호 -->
                <v-text-field
                    class="mb-3"
                    :class="$vuetify.breakpoint.mobile? '':'mx-16'"
                    outlined
                    v-model="password"
                    label="비밀번호"
                    persistent-placeholder
                    type="password"
                    @change="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="password_Errors"
                ></v-text-field>

                <!-- 비밀번호 확인 -->
                <v-text-field
                    class="mb-3"
                    :class="$vuetify.breakpoint.mobile? '':'mx-16'"
                    outlined
                    v-model="password_check"
                    label="비밀번호 확인"
                    persistent-placeholder
                    type="password"
                    @change="$v.password_check.$touch()"
                    @blur="$v.password_check.$touch()"
                    :error-messages="password_check_Errors"
                ></v-text-field>

                <!-- 이메일 -->
                <v-text-field
                    class="mb-3"
                    :class="$vuetify.breakpoint.mobile? '':'mx-16'"
                    outlined
                    v-model="email"
                    label="이메일"
                    persistent-placeholder
                    @change="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="email_Errors"
                ></v-text-field>
            </v-sheet>

            <!-- 가입하기 -->
            <div
                :class="$vuetify.breakpoint.mobile? '':'mx-16'"
            >
                <v-btn
                    color="primary"
                    block
                    dark
                    x-large
                    depressed
                    @click="submit()"
                >
                    가입하기
                </v-btn>
            </div>
        </v-sheet>
    </v-sheet>
</template>
<script>
// 검증
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        user_id: {
            required,
            minLength: minLength(2)
        },

        password: {
            required,
            minLength: minLength(6)
        },

        password_check: {
            required,
            sameAsPassword: sameAs('password')
        },

        email: {
            required,
            email
        }
    },

    data: () => ({
        // 입력값
        user_id:"",
        password:"",
        password_check:"",
        email:"",

        // 중복 체크용 목록
        user_id_list: [],
        email_list: []
    }),

    computed: {
        // 아이디 Error 문구
        user_id_Errors () {
            const errors = []
            if (!this.$v.user_id.$dirty) return errors
            !this.$v.user_id.required && errors.push('아이디를 입력해주세요')
            !this.$v.user_id.minLength && errors.push('아이디는 최소 2자 이상이여야합니다')
            this.user_id_list.includes(this.$v.user_id.$model) && errors.push('입력하신 아이디는 이미 존재합니다.')
            return errors
        },

        // 비밀번호 Error 문구
        password_Errors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('비밀번호를 입력해주세요')
            !this.$v.password.minLength && errors.push('패스워드는 최소 6자 이상이여야합니다')
            return errors
        },

        // 비밀번호 확인 Error 문구
        password_check_Errors () {
            const errors = []
            if (!this.$v.password_check.$dirty) return errors
            !this.$v.password_check.required && errors.push('비밀번호 확인을 입력해주세요')
            !this.$v.password_check.sameAsPassword && errors.push('비밀번호 확인이 같지 않습니다')
            return errors
        },

        // 이메일 Error 문구
        email_Errors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push('이메일을 입력해주세요')
            !this.$v.email.email && errors.push('이메일 형식으로 입력해주세요')
            this.email_list.includes(this.$v.email.$model) && errors.push('입력하신 이메일은 이미 존재합니다.')
            return errors
        }
    },

    created () {
        // 기존 아이디 검색
        this.loadUserIdList()

        // 기존 이메일 검색
        this.loadEmailList()
    },

    methods: {
        // 기존 아이디 검색
        async loadUserIdList(){
            await this.$http.get('/api/auth/join/user_id_search')
            .then((res) => {
                let list = []
                res.data.forEach(element => {list.push(element.user_id)})
                this.user_id_list = list
            })
        },

        // 기존 이메일 검색
        async loadEmailList(){
            this.$http.get('/api/auth/join/email_search')
            .then((res) => {
                var list = []
                res.data.forEach(element => {list.push(element.email)})
                this.email_list = list
            })
        },

        // 가입하기
        submit: _.debounce(async function() {
            // 입력값 기본 검증
            this.$v.$touch()

            // 기존 아이디 검색
            await this.loadUserIdList()


            // 기존 이메일 검색
            await this.loadEmailList()

            // 입력값 기본 검증 통과 시
            if(!this.$v.$invalid){
                // 추가 검증
                if(this.user_id_list.includes(this.user_id))
                {
                    alert("입력하신 아이디는 이미 존재합니다.")
                }
                else if(this.email_list.includes(this.email))
                {
                    alert("입력하신 이메일은 이미 가입하신 이메일입니다.")
                }
                else
                {
                    this.$http.post('/api/auth/join/insert', {
                        params: {
                            user_id:this.user_id,
                            password:this.password,
                            email:this.email,
                            status: "미인증"
                        }
                    }).then((res) => {
                        if(!res.data.affectedRows){
                            alert("회원가입 도중 오류가 발생하였습니다.\n반복시 고객센터에 문의바랍니다.")
                        }else{
                            alert("회원가입을 성공적으로 완료하였습니다.\n작성하신 이메일로 인증 메일이 발송되었습니다.\n메일에서 '메일 인증'버튼을 누르시면 회원가입이 완료됩니다.")

                            // 인증 이메일 발송
                            this.$http.post('/api/auth/email/send', {
                                params: {
                                    user_id: this.user_id,
                                    email: this.email
                                }
                            })
                            
                            this.$router.push("/")
                        }
                    })
                }   
            } 
        }, 500)
    }
}
</script>
<style scoped>
/* v-text-field, v-select */
.v-text-field--outlined >>> fieldset {
    border-color: #E0E0EB;
    border-radius: 8px;
}

.v-text-field--outlined >>> label {
    color: #2196F3;
    font-size:16px;
    font-weight:400;
}

::v-deep .v-text-field input {
    margin-left:8px;
    font-size: 18px;
}

::v-deep .v-select input {
    margin-left:8px;
    font-size: 18px;
}
</style>