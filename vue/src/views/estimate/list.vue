<template>
    <v-sheet
        width="950"
        class="rounded-lg pa-8 pb-6"
        outlined
    >
        <v-sheet class="d-flex mb-3">
            <p class="text-h6 mt-2px">
                <v-icon color="blue" class="mb-1 mr-1">mdi-layers-search-outline</v-icon>
                견적요청 목록
            </p>
            <v-spacer></v-spacer>
            <!-- 순서 -->
            <v-sheet
                width="180"
                class="mr-2 "
            >
                <v-select
                    class="rounded-lg"
                    dense
                    outlined
                    hide-details
                    v-model="sequence"
                    :items="select_list.sequence"
                >
                    <template v-slot:selection="{ item }">
                        <span class="pl-2">{{item}}</span>
                    </template>
                    <template v-slot:append>
                        <v-icon class="mr-1" color="#424361">mdi-chevron-down</v-icon>
                    </template>
                </v-select>
            </v-sheet>
        </v-sheet>
        <v-data-table
            class="custom_list"
            :items="list"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
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
                                width="540"
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

        <!-- 페이징 -->
        <v-pagination
            class="my-2 elevation-0"
            color="blue"
            v-model="page"
            :length="pageCount"
            :total-visible="10"
        ></v-pagination>
    </v-sheet>
</template>
<script>
import EstimateList from '@/views/estimate/list'
import EstimateRead from '@/views/estimate/read'

export default {
    components: {
        EstimateList,
        EstimateRead,
    },

    props: [
        "list"
    ],

    data: () => ({
        select_list: {
            sequence: [
                "최신순",
                "오래된순",
            ]
        },

        sequence: "최신순",

        // 페이징
        page: 1,
        pageCount: 0,
        itemsPerPage: 20,
    }),

    watch: {
        sequence(){
            this.list = this.list.reverse()
        }
    },

    mounted() {
    },

    methods: {
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
<style>
.v-btn::before {
    background-color: transparent;
}

.btn-with-hover:hover .v-icon {
    color: #2196F3;
}

.custom_list tr:hover td:hover {
  background-color: #f7f7f7;
}
</style>