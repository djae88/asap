<template>
    <v-sheet class="pa-2 rounded-lg" outlined>
        <v-sheet class="d-flex justify-space-between align-center py-2 px-1">
            <!-- 작은 제목 -->
            <p class="font-weight-medium ma-0 ml-3 mb-3px">
                출발지 관리
            </p>

            <!-- 출발지 추가하기 -->
            <Insert
                @reload="load()"
            />
        </v-sheet>

        <!-- 출발지 목록 -->
        <v-data-table
            class="ma-1"
            :headers="headers"
            :items="list"
            :footer-props="{
                'items-per-page-options': [10, 20, 100, -1],
                'items-per-page-text':'페이지당 출발지 수'
            }"
            no-data-text="아직 등록한 출발지가 없습니다."
            style="border:1px solid #e0e0e0"
        >
            <template v-slot:item="{ item }">
                <tr>
                    <!-- 발송인 -->
                    <td style="120px" :style="$route.path.startsWith('/mypage')? '':'cursor:pointer'" @click="select(item)">
                        <font class="d-block text-truncate font-weight-medium" style="width:120px;">{{item.sender}}</font>
                    </td>

                    <!-- 연락처 -->
                    <td style="140px" :style="$route.path.startsWith('/mypage')? '':'cursor:pointer'" @click="select(item)">
                        <font class="d-block text-truncate" style="width:140px;">{{item.phone}}</font>
                    </td>
                    
                    <!-- 출발지 -->
                    <td style="width:100%" :style="$route.path.startsWith('/mypage')? '':'cursor:pointer'" @click="select(item)">
                        <font class="d-block text-truncate" style="width:560px;">{{item.address}}</font>
                    </td>

                    <!-- 기본 출발지 설정 -->
                    <td style="80px" class="pa-2">
                        <div class="d-block text-truncate" style="width:80px;">
                            <v-btn v-if="item.isDefault" small class="px-4" outlined color="red">기본</v-btn>
                            <v-btn v-if="!item.isDefault" small class="px-4" outlined color="orange" @click="update_address(item)">설정</v-btn>
                        </div>
                    </td>

                    <!-- 출발지 삭제하기 -->
                    <td style="80px" class="pa-2">
                        <div class="d-block text-truncate" style="width:80px;">
                            <v-btn small class="px-4" outlined color="orange" @click="delete_address(item)">삭제</v-btn>
                        </div>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-sheet>
</template>
<script>
import Insert from "./StartAddress/Insert.vue"

export default {
    components: {
        Insert
    },
    data: () => ({
        headers: [
            { text: '발송인' },
            { text: '연락처' },
            { text: '출발지' },
            { text: '기본' },
            { text: '삭제' },
        ],
        list: []
    }),
    
    mounted () {
        // 출발지 목록
        this.load()
    },

    methods: {
        // 출발지 목록
        load(){
            this.$http.post('/api/mypage/startAddress/list', {
                params: {
                    user_id:this.$store.state.urbangx_user.user_id
                }
            }).then((res) => {
                this.list = res.data
            })
        },

        // 기본 출발지 설정하기
        update_address(item){
            if(confirm("해당 출발지를 기본 출발지로 지정하겠습니까?")){
                this.$http.post('/api/mypage/startAddress/setDefault', {
                    params: {
                        user_id:this.$store.state.urbangx_user.user_id,
                        id: item.id
                    }
                }).then((res) => {
                    if(!res.data.affectedRows){
                        alert("출발지 삭제도중 오류가 발생하였습니다.")
                    }else{
                        this.load()
                    }
                })
            }
        },

        // 출발지 삭제하기
        delete_address(item){
            if(confirm("정말 해당 출발지를 삭제하시겠습니까?")){
                this.$http.post('/api/mypage/startAddress/delete', {
                    params: {
                        id: item.id
                    }
                }).then((res) => {
                    if(!res.data.affectedRows){
                        alert("출발지 삭제도중 오류가 발생하였습니다.")
                    }else{
                        this.load()
                    }
                })
            }
        },

        select(item){
            if(!this.$route.path.startsWith('/mypage')){
                this.$emit("startSelected", item)
            }
        }
    }
}
</script>