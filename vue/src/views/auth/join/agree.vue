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
                <p class="text-center text-subtitle-1 font-weight-medium mt-2 grey--text text--darken-2">
                    회원가입
                </p>
                <p class="text-center text-caption grey--text text--darken-1">
                    필수 이용약관 확인 후 동의해주시기 바랍니다
                </p>
            </v-sheet>

            <v-card-text class="mt-2 px-4">
                <v-sheet class="d-flex ml-8 mr-6">
                    <v-checkbox
                        style="padding-top:3px !important"
                        class="ma-0 pa-0"
                        color="primary"
                        v-model="rule"
                        :error-messages="rule_Errors"
                        label="ASAP 이용약관"
                        required
                        @change="$v.rule.$touch()"
                        @blur="$v.rule.$touch()"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <router-link to="/policy/rule?type=read" style="cursor:pointer; text-decoration:none !important;">
                        <p class="text-subtitle-2 font-weight-bold mt-3px mr-3 primary--text">
                            약관보기
                            <v-icon size="20" class="ml-1 mb-2px" color="primary">
                                mdi-open-in-new
                            </v-icon>
                        </p>
                    </router-link>
                </v-sheet>
                <v-sheet class="d-flex ml-8 mr-6">
                    <v-checkbox
                        style="padding-top:3px !important"
                        class="ma-0 pa-0"
                        color="primary"
                        v-model="privacy"
                        :error-messages="privacy_Errors"
                        label="개인정보처리방침"
                        required
                        @change="$v.privacy.$touch()"
                        @blur="$v.privacy.$touch()"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <router-link to="/policy/privacy?type=read" style="cursor:pointer; text-decoration:none !important;">
                        <p class="text-subtitle-2 font-weight-bold mt-3px mr-3 primary--text">
                            약관보기
                            <v-icon size="20" class="ml-1 mb-2px" color="primary">
                                mdi-open-in-new
                            </v-icon>
                        </p>
                    </router-link>
                </v-sheet>
            </v-card-text>
            <v-sheet class="d-flex justify-center mt-6">
                <v-btn
                    class="px-16 rounded-lg"
                    color="primary"
                    large
                    dark
                    depressed
                    @click="submit()"
                >
                    진행하기
                </v-btn>
            </v-sheet>
        </v-sheet>
    </v-sheet>
</template>
<script>
import { validationMixin } from 'vuelidate'

export default {
    mixins: [validationMixin],

    validations: {
        rule: {
            checked (val) {
                return val
            }
        },

        privacy: {
            checked (val) {
                return val
            }
        }
    },

    data: () => ({
        rule:false,
        privacy:false,
        submitStatus: null
    }),

    computed: {
        rule_Errors () {
            const errors = []
            if (!this.$v.rule.$dirty) return errors
            !this.$v.rule.checked && errors.push('이용약관에 동의해주세요')
            return errors
        },
        privacy_Errors () {
            const errors = []
            if (!this.$v.privacy.$dirty) return errors
            !this.$v.privacy.checked && errors.push('개인정보처리방침에 동의해주세요')
            return errors
        }
    },

    methods: {
        submit () {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                this.submitStatus = 'OK'
                }, 500)
                this.$router.push('/auth/join/form')
            }
        }
    }
}
</script>
<style>
  .v-input--checkbox .v-label {
    font-size: 15px;
    font-weight: bold;
  }
</style>