<template>
    <div>
        <!-- 견적 요청 -->
        <v-sheet
            width="600"
            class="rounded-xl pa-10 pt-9 pb-7 mx-auto"
            outlined
        >
            <p class="text-h6 mb-4">
                <v-icon color="blue" class="mb-1 mr-1">mdi-layers-edit</v-icon>
                견적작성
            </p>

            <!-- 공급자 -->
            <v-sheet
                outlined
                class="px-4 pt-3 pb-1 rounded-lg mb-4"
            >
                <p
                    class="text-body-1 font-weight-medium mb-3"
                >
                    <v-icon small color="primary" class="pb-1 mr-1">mdi-account-arrow-right-outline</v-icon>
                    공급자
                </p>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="업체명"
                    v-model="provider_company"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="주소"
                    v-model="provider_address"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="연락처"
                    v-model="provider_phone"
                ></v-text-field>
            </v-sheet>

            <!-- 견적내용 -->
            <v-sheet
                outlined
                class="px-4 pt-3 pb-1 rounded-lg mb-4"
            >
                <p
                    class="text-body-1 font-weight-medium mb-3"
                >
                    <v-icon small color="primary" class="pb-1 mr-1">mdi-post-outline</v-icon>
                    견적내용
                </p>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="품명"
                    v-model="estimate_product_name"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="수량"
                    v-model="estimate_amount"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="단가 (VAT 별도)"
                    v-model="estimate_price"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="합계"
                    v-model="estimate_total"
                ></v-text-field>
            </v-sheet>

            <!-- 견적내용 -->
            <v-sheet
                outlined
                class="px-4 pt-3 pb-1 rounded-lg"
            >
                <p
                    class="text-body-1 font-weight-medium mb-3"
                >
                    <v-icon small color="primary" class="pb-1 mr-1">mdi-check-circle-outline</v-icon>
                    조건
                </p>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="납기"
                    v-model="condition_pay_date"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="견적유효기간"
                    v-model="condition_validity"
                ></v-text-field>
                <v-text-field
                    dense
                    class="rounded-lg mb-4"
                    outlined
                    hide-details
                    label="결제조건"
                    v-model="condition_option"
                ></v-text-field>
            </v-sheet>

            <!-- 버튼 -->
            <div class="mt-6 d-flex justify-center">
                <!-- 제출 -->
                <v-btn
                    width="110"
                    height="42"
                    dark
                    depressed
                    color="blue"
                    class="font-weight-bold rounded-lg mr-4"
                    @click="dialog.detail = true"
                >
                    확인
                </v-btn>

                <!-- 취소 -->
                <v-btn
                    width="110"
                    height="42"
                    depressed
                    color="grey"
                    dark
                    class="font-weight-bold rounded-lg"
                    @click="close()"
                >
                    취소
                </v-btn>
            </div>
        </v-sheet>

        <!-- 견적 미리보기 (dialog) -->
        <v-dialog
            v-model="dialog.detail"
            width="auto"
            content-class="rounded-xl"
        >
            <!-- 견적 미리보기 -->
            <v-sheet
                width="600"
                class="rounded-xl pa-10 py-9 mx-auto"
                outlined
            >
                <p class="text-h6 mb-4">
                    <v-icon color="blue" class="mb-1 mr-1">mdi-layers-edit</v-icon>
                    견적 미리보기
                </p>

                <!-- 공급자 -->
                <v-sheet
                    outlined
                    class="px-4 py-3 rounded-lg mb-4"
                >
                    <p
                        class="text-body-1 font-weight-medium mb-3"
                    >
                        <v-icon small color="primary" class="pb-1 mr-1">mdi-account-arrow-right-outline</v-icon>
                        공급자
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">업체명:</span>{{provider_company}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">주소:</span>{{provider_address}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">연락처:</span>{{provider_phone}}
                    </p>
                </v-sheet>

                <!-- 견적내용 -->
                <v-sheet
                    outlined
                    class="px-4 py-3 rounded-lg mb-4"
                >
                    <p
                        class="text-body-1 font-weight-medium mb-3"
                    >
                        <v-icon small color="primary" class="pb-1 mr-1">mdi-post-outline</v-icon>
                        견적내용
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">품명:</span>{{estimate_product_name}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">수량:</span>{{estimate_amount}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">단가:</span>{{estimate_price}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:64px">합계:</span>{{estimate_total}}
                    </p>
                </v-sheet>

                <!-- 견적내용 -->
                <v-sheet
                    outlined
                    class="px-4 py-3 rounded-lg"
                >
                    <p
                        class="text-body-1 font-weight-medium mb-3"
                    >
                        <v-icon small color="primary" class="pb-1 mr-1">mdi-check-circle-outline</v-icon>
                        조건
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:120px">납기:</span>{{condition_pay_date}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:120px">견적유효기간:</span>{{condition_validity}}
                    </p>
                    <p class="ml-2 mb-1">
                        <span style="display:inline-block; width:120px">결제조건:</span>{{condition_option}}
                    </p>
                </v-sheet>

                <!-- 버튼 -->
                <div class="mt-6 d-flex justify-center">
                    <!-- 제출 -->
                    <v-btn
                        width="110"
                        height="42"
                        dark
                        depressed
                        color="blue"
                        class="font-weight-bold rounded-lg mr-4"
                        @click="submit()"
                    >
                        발송
                    </v-btn>

                    <!-- 취소 -->
                    <v-btn
                        width="110"
                        height="42"
                        depressed
                        color="grey"
                        dark
                        class="font-weight-bold rounded-lg"
                        @click="close()"
                    >
                        취소
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: ["requestor"],
    
    data: () => ({
        provider_company: "",
        provider_address: "",
        provider_phone: "",
        estimate_product_name: "",
        estimate_amount: "",
        estimate_price: "",
        estimate_total: "",
        condition_pay_date: "",
        condition_validity: "",
        condition_option: "",

        dialog: {
            detail: false
        }
    }),

    methods: {
        // 제출
        submit: _.debounce(function() {
            if(this.provider_company == "")
            {
                alert("공급자 업체명을 입력해주세요")
            }
            else if(this.provider_address == "")
            {
                alert("공급자 주소를 입력해주세요")
            }
            else if(this.provider_phone == "")
            {
                alert("공급자 연락처를 입력해주세요")
            }
            else if(this.estimate_product_name == "")
            {
                alert("견적내용 품명을 입력해주세요")
            }
            else if(this.estimate_amount == "")
            {
                alert("견적내용 수량을 입력해주세요")
            }
            else if(this.estimate_price == "")
            {
                alert("견적내용 단가를 입력해주세요")
            }
            else if(this.estimate_total == "")
            {
                alert("견적내용 합계를 입력해주세요")
            }
            else if(this.condition_pay_date == "")
            {
                alert("조건 납기를 입력해주세요")
            }
            else if(this.condition_validity == "")
            {
                alert("조건 견적유효기간을 입력해주세요")
            }
            else if(this.condition_option == "")
            {
                alert("결제조건을 입력해주세요")
            }
            else{
                this.$http.post("/api/estimate/insert", {
                    params: {
                        estimate_request_id: this.$route.query.id,
                        writer: this.$store.state.asap_user.user_id,
                        requestor: this.requestor,
                        provider_company: this.provider_company,
                        provider_address: this.provider_address,
                        provider_phone: this.provider_phone,
                        estimate_product_name: this.estimate_product_name,
                        estimate_amount: this.estimate_amount,
                        estimate_price: this.estimate_price,
                        estimate_total: this.estimate_total,
                        condition_pay_date: this.condition_pay_date,
                        condition_validity: this.condition_validity,
                        condition_option: this.condition_option
                    }
                }).then((res) => {
                    if(res.data.affectedRows){
                        console.log(res)
                        this.$http.post("/api/message/insert", {
                            params: {
                                type: "estimate",
                                sender: this.$store.state.asap_user.user_id,
                                receiver: this.requestor,
                                content: null,
                                image: null,
                                attachment: null,
                                estimate_id: res.data.insertId
                            }
                        }).then((res) => {
                            if(res.data.affectedRows){
                                alert("견적 작성이 완료되었습니다.")
                                this.$router.push("/message?to="+this.requestor)
                            }
                        })
                    }
                })
            }
        }, 500)
    }
}
</script>
<style scoped>
::v-deep .v-text-field input {
    margin-left:2px;
}
</style>