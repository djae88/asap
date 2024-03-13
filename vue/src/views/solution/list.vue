<template>
    <v-sheet
        width="950"
        class="rounded-lg pa-8 pb-6"
        outlined
    >
        <v-sheet class="d-flex mb-3">
            <p class="text-h6 mt-2px">
                <v-icon color="blue" class="mb-1 mr-1">mdi-layers-search-outline</v-icon>
                제품/솔루션
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

            <!-- 작성하기 -->
            <v-btn
                width="40"
                height="40"
                class="rounded-lg"
                color="primary"
                dark
                small
                depressed
                @click="write()"
            >
                <v-icon size="20">mdi-pencil</v-icon>
            </v-btn>
        </v-sheet>
        <v-data-table
            class="custom_list"
            :items="list"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
            hide-default-footer
            no-data-text="제품/솔루션이 존재하지 않습니다."
        >
            <template v-slot:item="{ item }">
                <tr 
                    class="pa-0 ma-0" 
                    style="cursor:pointer;"
                    @click="read(item)"
                >
                    <td class="py-2 px-2">
                        <div class="d-flex align-center">
                            <v-sheet
                                width="84"
                                class="mr-4"
                            >
                                <v-img
                                    height="60"
                                    :src="item.image"
                                />
                            </v-sheet>
                            <v-sheet
                                width="660"
                                class="text-truncate"
                                color="transparent"
                            >
                                <p class="mb-0 mt-0 mr-1 text-subtitle-1 font-weight-medium">
                                    {{item.title}}
                                    <v-icon color="red" size="20" class="mb-2px">mdi-alpha-n-box</v-icon>
                                </p>
                                <p class="mr-1 mb-0 text-body-2 grey--text text--darken-1 text-truncate">
                                    {{removeHTML(item.content)}}
                                </p>
                                <p class="text-caption mb-0 pb-2px">
                                    <font class="grey--text">
                                        작성자 : {{item.writer}}
                                    </font>
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
                                    height="40"
                                    x-small
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
                                    height="40"
                                    x-small
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

        <!-- 버튼 & 페이지네이션 -->
        <v-sheet class="mx-2 d-flex align-center">
            <v-spacer></v-spacer>

            <!-- 페이징 -->
            <v-pagination
                class="my-2 elevation-0"
                color="blue"
                v-model="page"
                :length="pageCount"
                :total-visible="10"
            ></v-pagination>
            <v-spacer></v-spacer>
        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
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
        itemsPerPage: 28,
    }),

    watch: {
        sequence(){
            this.list = this.list.reverse()
        }
    },

    mounted() {
    },

    methods: {
        // HTML 제거
        removeHTML(string){
            return string.replace(/<[^>]*>?/g, '')
        },

        // 게시글로 이동
        read(item){
            this.$router.push("/solution?type=read&id="+item.id)
        },

        // 게시글 작성
        write(){
            if(!this.$store.state.asap_user.is_logined){
                alert("작성하기는 로그인 이후 가능합니다.")
            }else{
                this.$router.push("/solution?type=create")
            }
        },

        // 스크랩하기
        scrap(item){
            if(item.is_scraped == 0){
                this.$http.post("/api/solution/insert/scrap", {
                    params: {
                        user_id: this.$store.state.asap_user.user_id,
                        solution_id: item.id
                    }
                }).then(() => {
                    item.is_scraped = 1
                })
            }else{
                this.$http.post("/api/solution/delete/scrap", {
                    params: {
                        user_id: this.$store.state.asap_user.user_id,
                        solution_id: item.id
                    }
                }).then(() => {
                    item.is_scraped = 0
                })
            }
        },

        // 새 탭 열기
        newTab(item){
            window.open("/solution?type=read&id="+item.id, '_blank')
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