<template>
    <!-- 견적 상세보기 -->
    <v-sheet
        width="600"
        class="rounded-xl pa-10 py-9 mx-auto"
        outlined
    >
        <p class="text-h6 mb-4">
            <v-icon color="blue" class="mb-1 mr-1">mdi-layers-edit</v-icon>
            견적 상세보기
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
    </v-sheet>
</template>
<script>
export default {
    props: ["id"],
    
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
        condition_option: ""
    }),

    mounted(){
        this.load()
    },

    methods: {
        load(){
            this.$http.post("/api/estimate/select/specific", {
                params: {
                    id: this.id
                }
            }).then((res) => {
                console.log(res)
                this.provider_company = res.data[0].provider_company
                this.provider_address = res.data[0].provider_address
                this.provider_phone = res.data[0].provider_phone
                this.estimate_product_name = res.data[0].estimate_product_name
                this.estimate_amount = res.data[0].estimate_amount
                this.estimate_price = res.data[0].estimate_price
                this.estimate_total = res.data[0].estimate_total
                this.condition_pay_date = res.data[0].condition_pay_date
                this.condition_validity = res.data[0].condition_validity
                this.condition_option = res.data[0].condition_option
            })
        }
    }
}
</script>
<style scoped>
::v-deep .v-text-field input {
    margin-left:2px;
}
</style>