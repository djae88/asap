<template>
    <v-sheet
        width="1200"
        class="mx-auto pt-16 px-2"
        color="transparent"
    >
        <!-- 제목 -->
        <p class="text-center mb-2">
            <v-icon
                size="50"
                color="primary"
            >
                mdi-layers-search-outline
            </v-icon>
            <br/>
        </p>
        <p class="text-center text-subtitle-1 font-weight-medium">
            새로 올라온 견적요청
        </p>

        <!-- 목록 -->
        <v-sheet
            width="880"
            class="rounded-xl mt-12 pa-10 pb-7 mx-auto"
            outlined
        >
            <v-data-table
                class="custom_list"
                :items="list"
                hide-default-footer
                no-data-text="게시글이 존재하지 않습니다."
            >
                <template v-slot:item="{ item }">
                    <tr 
                        class="pa-0 ma-0" 
                        style="cursor:pointer;"
                        @click="read(item)"
                    >
                        <td class="py-4 px-2">
                            <div class="d-flex align-center">
                                <v-sheet
                                    width="140"
                                    class="mr-4"
                                >
                                    <v-img
                                        v-if="item.thumbnail"
                                        height="100"
                                        :src="'/upload/estimate/thumbnail/'+item.thumbnail"
                                    />
                                </v-sheet>

                                <v-sheet
                                    width="480"
                                    class="text-truncate"
                                    color="transparent"
                                >
                                    <p class="mb-2 mt-2 mr-1 text-h6 font-weight-medium">
                                        {{item.product_name}}
                                        <v-icon color="red" size="24" class="mb-1">mdi-alpha-n-box</v-icon>
                                    </p>
                                    <p class="mr-1 mb-0 text-subtitle-2 grey--text text--darken-1 text-truncate">
                                        작성자 : {{item.writer}} | 
                                        수량: {{item.amount}} | 
                                        일자: {{item.pay_date}} | 
                                        마감기한: {{item.deadline}}
                                    </p>
                                    <p>
                                        <font class="grey--text">
                                            {{
                                                new Date().toLocaleDateString() == new Date(item.created).toLocaleDateString()?
                                                new Date(item.created).toLocaleTimeString() : new Date(item.created).toLocaleDateString()
                                            }}
                                        </font>
                                        <font class="ml-2 grey--text">
                                            <v-icon small color="grey" class="mr-1 pb-2px">mdi-eye-outline</v-icon>
                                            {{item.view_count}}
                                        </font>
                                    </p>
                                </v-sheet>
                                    
                                <v-spacer></v-spacer>
                                <div>
                                    <v-btn
                                        v-ripple="false"
                                        height="48"
                                        small
                                        depressed
                                        style="background:white; border:1px solid #ccc;"
                                        class="mr-2"
                                        color="blue--text text--lighten-3"
                                        @click.stop="scrap(item)"
                                    >
                                        <v-icon v-if="item.is_scraped==0" size="20" color="grey lighten-1">mdi-star</v-icon>
                                        <v-icon v-if="item.is_scraped!=0" size="20" color="blue">mdi-star</v-icon>
                                    </v-btn>
                                    <v-btn
                                        v-ripple="false"
                                        height="48"
                                        small
                                        depressed
                                        style="background:white; border:1px solid #ccc;"
                                        class="btn-with-hover"
                                        color="grey--text text--lighten-1"
                                        @click.stop="newTab(item)"
                                    >
                                        <v-icon size="20">mdi-content-copy</v-icon>    
                                    </v-btn>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        // 목록
        list: [],
    }),

    mounted() {
        // 첫 목록 불러오기
        this.load()
    },

    methods: {
        // 첫 목록
        load(){
            this.$http.post('/api/estimate_request/select/list', {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data.slice(0,4)
            })
        },

        // 게시글로 이동
        read(item){
            this.$router.push("/estimate?type=read&id="+item.id)
        },

        // 스크랩하기
        scrap(item){
            if(item.is_scraped == 0){
                this.$http.post("/api/estimate_request/insert/scrap", {
                    params: {
                        user_id: this.$store.state.asap_user.user_id,
                        estimate_request_id: item.id
                    }
                }).then(() => {
                    item.is_scraped = 1
                })
            }else{
                this.$http.post("/api/estimate_request/delete/scrap", {
                    params: {
                        user_id: this.$store.state.asap_user.user_id,
                        estimate_request_id: item.id
                    }
                }).then(() => {
                    item.is_scraped = 0
                })
            }
        },

        // 새 탭 열기
        newTab(item){
            window.open("/estimate?type=read&id="+item.id, '_blank')
        }
    }
}
</script>
<style scoped>
.v-btn::before {
    background-color: transparent;
}

.custom_list tr:hover td:hover {
  background-color: #f7f7f7;
}
</style>