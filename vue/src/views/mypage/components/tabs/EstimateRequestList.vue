<template>
    <v-sheet class="pa-2 ma-4 rounded-lg" outlined>
        <v-data-table
            id="custom_list"
            :headers="headers"
            :items="list"
            :footer-props="{
                'items-per-page-options': [5, 20, 100, -1],
                'items-per-page-text':'페이지당 견적요청 수'
            }"
            no-data-text="견적요청 내역이 없습니다."
        >
            <template v-slot:item="{ item }">
                <tr style="cursor:pointer;" @click="link(item)">
                    <td style="width:86px">
                        <v-img
                            class="mx-auto"
                            height="50"
                            width="70"
                            :src="'/upload/estimate/thumbnail/'+item.thumbnail"
                        ></v-img>
                    </td>
                    <td style="width:280px">
                        {{item.product_name}}
                    </td>
                    <td style="width:140px">
                        {{item.amount}}
                    </td>
                    <td style="width:160px">
                        {{item.pay_date}}
                    </td>
                    <td style="width:160px">
                        {{item.deadline}}
                    </td>
                    <td style="width:200px">
                        {{new Date(item.created).toLocaleString()}}
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({               
        headers: [
            {text: '썸네일', value: 'thumbnail'},
            {text: '품명', value: 'product_name'},
            {text: '수량', value: 'amount'},
            {text: '일자', value: 'pay_date'},
            {text: '마감 기한', value: 'deadline'},
            {text: '작성 일자', value: 'created'}
        ],

        list: []
    }),

    mounted(){
        // 목록
        this.load()
    },

    methods: {
        // 목록
        load(){
            this.$http.post("/api/estimate_request/select/writer", {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data
            })
        },

        // 견적요청 읽기로 이동
        link(item){
            this.$router.push("/estimate?type=read&id="+item.id)
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