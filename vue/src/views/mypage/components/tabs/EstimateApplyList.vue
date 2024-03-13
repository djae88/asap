<template>
    <v-sheet class="pa-2 ma-4 rounded-lg" outlined>
        <v-data-table
            id="custom_list"
            :headers="headers"
            :items="list"
            :footer-props="{
                'items-per-page-options': [5, 20, 100, -1],
                'items-per-page-text':'페이지당 견적작성 수'
            }"
            no-data-text="견적작성 내역이 없습니다."
        >
            <template v-slot:item="{ item }">
                <tr style="cursor:pointer;" @click="link(item)">
                    <td style="width:120px">
                        {{item.requestor}}
                    </td>
                    <td style="width:160px">
                        {{item.estimate_product_name}}
                    </td>
                    <td style="width:140px">
                        {{item.estimate_amount}}
                    </td>
                    <td style="width:160px">
                        {{item.estimate_price}}
                    </td>
                    <td style="width:160px">
                        {{item.estimate_total}}
                    </td>
                    <td style="width:200px">
                        {{new Date(item.created).toLocaleString()}}
                    </td>
                </tr>
            </template>
        </v-data-table>

        <!-- 견적 상세보기 (dialog) -->
        <v-dialog
            v-model="dialog.estimate"
            width="auto"
            content-class="rounded-xl"
        >
            <EstimateView
                :id="estimate_id"
            />
        </v-dialog>
    </v-sheet>
</template>
<script>
import EstimateView from "@/views/message/components/EstimateView"

export default {
    components: {
        EstimateView
    },

    data: () => ({               
        headers: [
            {text: '요청자', value: 'requestor'},
            {text: '품명', value: 'estimate_product_name'},
            {text: '수량', value: 'estimate_amount'},
            {text: '단가', value: 'estimate_price'},
            {text: '합계', value: 'estimate_total'},
            {text: '작성일자', value: 'created'}
        ],

        list: [],

        dialog: {
            estimate: false
        },

        estimate_id: null
    }),

    mounted(){
        // 목록
        this.load()
    },

    methods: {
        // 목록
        load(){
            this.$http.post("/api/estimate/select/writer", {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data
            })
        },

        // 견적요청 읽기로 이동
        link(item){
            this.estimate_id = item.id
            this.dialog.estimate = true
        }
    }
}
</script>
<style>
#custom_list{
    border:1px solid #efefef;
}

#custom_list tr th{
    background:#f7f7f7;
}

#custom_list tr th, #custom_list tr td{
    padding:8px;
}

#custom_list tr th:not(:last-child), #custom_list tr td:not(:last-child){
    border-right:1px solid #efefef;
}
</style>