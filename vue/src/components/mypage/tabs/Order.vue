<template>
    <v-sheet class="pa-2 ma-4 rounded-lg" outlined>
        <v-data-table
            id="custom_list"
            :headers="headers"
            :items="list"
            :footer-props="{
                'items-per-page-options': [10, 20, 100, -1],
                'items-per-page-text':'페이지당 주문 수'
            }"
            no-data-text="주문 내역이 없습니다."
        >
            <template v-slot:item="{ item }">
                <tr style="cursor:pointer;" @click="linkToOrderDetail(item)">
                    <td style="width:200px">
                        <p class="ma-0 pl-1">
                            <span class="font-weight-medium">{{item.package_title}}</span>
                            <span class="orange--text ml-1">({{item.toss_id}})</span>
                            <br/>
                            <span class="text-caption">{{new Date(item.pay_date).toLocaleString()}}</span>
                        </p>
                    </td>
                    <td style="width:300px">
                        <p class="ma-0 pl-1 text-truncate" style="width:296px;">
                            <span class="font-weight-medium">{{item.start_sender}}</span><span class="ml-1 orange--text text-caption">({{item.start_phone}})</span><br/>
                            {{item.start_address}}
                        </p>
                    </td>
                    <td style="width:300px">
                        <p class="ma-0 pl-1 text-truncate" style="width:296px;">
                            <span class="font-weight-medium">{{item.end_receiver}}</span><span class="ml-1 orange--text text-caption">({{item.end_phone}})</span><br/>
                            {{item.end_address}}
                        </p>
                    </td>
                    <td style="width:200px">
                        <p class="ma-0 pl-1">
                            <span class="font-weight-medium blue--text">{{item.status}}</span><br/>
                            <span v-if="item.service_type == '일반 택배'" class="text-caption">{{new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()}} 도착 예정</span>
                            <span v-if="item.service_type == '특송 택배'" class="text-caption">{{new Date(new Date().setDate(new Date().getDate())).toLocaleDateString()}} 도착 예정</span>
                            <span v-if="item.service_type == '퀵 서비스'" class="text-caption">{{new Date(new Date().setDate(new Date().getDate())).toLocaleDateString()}} 도착 예정</span>
                        </p>
                    </td>
                </tr>
                <span v-if="false">{{item}}</span>
            </template>
        </v-data-table>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({               
        headers: [
            {text: '배송품 / 운송장번호', value: 'accepted'},
            {text: '출발지', value: 'phone'},
            {text: '도착지', value: 'phone'},
            {text: '배송 상태', value: 'created'}
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
            this.$http.post("/api/mypage/order/list", {
                params: {
                    user_id: this.$store.state.urbangx_user.user_id
                }
            }).then((res) => {
                this.list = res.data
            })
        },

        // 주문 상세로 이동
        linkToOrderDetail(item){
            this.$router.push('/mypage/order/detail?id='+item.toss_id)
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
    width:85px;
    padding:12px 5px;
    padding-left:10px;
}

#custom_list tr th:not(:last-child), #custom_list tr td:not(:last-child){
    border-right:1px solid #efefef;
}
</style>