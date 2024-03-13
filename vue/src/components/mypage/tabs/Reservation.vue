<template>
    <v-sheet class="pa-2 ma-4 rounded-lg" outlined>
        <v-data-table
            id="custom_list"
            :headers="headers"
            :items="list"
            :footer-props="{
                'items-per-page-options': [10, 20, 100, -1],
                'items-per-page-text':'페이지당 예약 수'
            }"
            no-data-text="예약 내역이 없습니다."
        >
            <template v-slot:item="{ item }">
                <tr>
                    <td style="width:200px">
                        <p class="ma-0 pl-1">
                            <span class="font-weight-medium">XXL사이즈 1개 외 12건</span><br/>
                            <span class="text-caption">{{new Date(new Date()).toLocaleString()}}</span>
                        </p>
                    </td>
                    <td style="width:300px">
                        <p class="ma-0 pl-1">
                            <span class="font-weight-medium">홍길동</span><span class="ml-1 orange--text text-caption">(010-6344-4580)</span><br/>
                            서울특별시 은평구 불광로 5가길 13-1, B01호
                        </p>
                    </td>
                    <td style="width:300px">
                        <p class="ma-0 pl-1">
                            <span class="font-weight-medium">고길동</span><span class="ml-1 orange--text text-caption">(010-6344-4580)</span><br/>
                            서울특별시 영등포구 영신로 38길 16, 3층
                        </p>
                    </td>
                    <td style="width:200px">
                        <p class="ma-0 pl-1">
                            <span class="font-weight-medium cyan--text">수거예정</span><br/>
                            <span class="text-caption">2022.11.30 수거 예정</span>
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
            {text: '예약 접수', value: 'accepted'},
            {text: '출발지', value: 'phone'},
            {text: '도착지', value: 'phone'},
            {text: '예약 상태', value: 'created'}
        ],

        list: [
            // 1,2,3,4,5
        ]
    })
}
</script>