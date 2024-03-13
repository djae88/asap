<template>
    <v-sheet class="pb-16 ma-2" outlined>
        <p class="pt-6 font-weight-bold text-center text-h5 grey--text text--darken-2">관리자 로그인</p>
        <v-divider class="mx-4"></v-divider>
        <v-sheet class="mt-10">
            <v-sheet
                width="340"
                class="my-10 mx-auto"
            >
                <!-- 문구 -->
                <v-sheet color="transparent" class="mx-auto mb-6">
                    <div class="d-flex mx-auto mb-10">
                        <v-img
                            height="80"
                            width="100"
                            contain
                            src="@/assets/logo/default.png"
                        ></v-img>
                    </div>
                </v-sheet>

                <v-text-field
                    outlined
                    flat
                    dense
                    v-model="user_id"
                    autofocus
                    color="blue"
                    placeholder="아이디"
                    @change="$v.user_id.$touch()"
                    @blur="$v.user_id.$touch()"
                    :error-messages="user_id_Errors"
                    @keyup.enter="submit()"
                >
                </v-text-field>
                <v-text-field
                    outlined
                    flat
                    dense
                    v-model="password"
                    color="blue"
                    placeholder="비밀번호"
                    type="password"
                    @change="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="password_Errors"
                    @keyup.enter="submit()"
                >
                </v-text-field>
                <v-btn
                    class="font-weight-bold"
                    color="blue"
                    dark
                    block
                    large
                    depressed
                    @click="submit()"
                >
                    로그인
                </v-btn>
            </v-sheet>
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
        ...mapMutations(['admin_login']),

        submit(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.$http.post("/api/admin/auth/login", {
                    params: {
                        user_id: this.user_id,
                        password:this.password
                    }
                }).then((res) => {
                    if(!res.data.length){
                        alert("아이디 또는 비밀번호가 잘못되었습니다.")
                    }else{
                        this.admin_login(res.data[0])
                        this.$router.push("/admin/banner")
                    }
                })
            }
        }
    }
}
</script>