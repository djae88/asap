<template>
    <div>
        <v-sheet
            color="#f9f9f9"
            class="pb-16"
        >
            <!-- 본문 -->
            <v-sheet
                width="1200"
                class="d-flex mx-auto pt-12 px-2"
                color="transparent"
            >
                <!-- 검색 -->
                <v-sheet
                    width="230"
                    class="rounded-lg pa-4"
                    outlined
                >
                    <v-sheet class="d-flex align-center mb-3 mt-1">
                        <p class="text-h6 ml-2 mb-0 font-weight-medium">
                            <v-icon color="blue" size="28" class="mb-2px mr-1">mdi-magnify</v-icon>
                            맞춤형 검색
                        </p>

                        <v-img
                            class="ml-2"
                            height="24"
                            width="24"
                            contain
                            src="@/assets/reset.png"
                            style="cursor:pointer;"
                            @click="load()"
                        ></v-img>
                    </v-sheet>

                    <!-- 이름 검색 -->
                    <v-text-field
                        height="48"
                        class="rounded-lg"
                        hide-details
                        outlined
                        dense
                        placeholder="검색어"
                        v-model="keyword.total"
                        @keyup.enter="search()"
                    >
                        <template v-slot:append>
                            <v-icon size="24" class="mt-1" color="#424361">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>

                    <!-- 순서 -->
                    <v-select
                        class="rounded-lg mt-2"
                        dense
                        outlined
                        hide-details
                        placeholder="분야"
                        v-model="keyword.category"
                        :items="select_list.field"
                    >
                        <template v-slot:selection="{ item }">
                            <span class="pl-1">{{item}}</span>
                        </template>
                        <template v-slot:append>
                            <v-icon color="#424361">mdi-chevron-down</v-icon>
                        </template>
                    </v-select>

                    <!-- 품명 -->
                    <v-text-field
                        class="rounded-lg mt-2"
                        dense
                        outlined
                        hide-details
                        placeholder="품명"
                        v-model="keyword.product_name"
                        @keyup.enter="search()"
                    ></v-text-field>

                    <!-- 수량 -->
                    <v-text-field
                        class="rounded-lg mt-2"
                        dense
                        outlined
                        hide-details
                        placeholder="수량"
                        v-model="keyword.amount"
                        @keyup.enter="search()"
                    ></v-text-field>

                    <!-- 일자 -->
                    <v-text-field
                        class="rounded-lg mt-2"
                        dense
                        outlined
                        hide-details
                        placeholder="일자"
                        v-model="keyword.day_date"
                        @keyup.enter="search()"
                    ></v-text-field>

                    <!-- 마감기한 -->
                    <v-text-field
                        class="rounded-lg mt-2"
                        dense
                        outlined
                        hide-details
                        placeholder="마감기한"
                        v-model="keyword.deadline"
                        @keyup.enter="search()"
                    ></v-text-field>

                    <v-btn
                        class="mt-6 mb-4"
                        depressed
                        color="primary"
                        dark
                        large
                        block
                        @click="search()"
                    >
                        검색하기
                    </v-btn>

                    <!-- <BannerView
                        type="side1"
                        class="mt-2"
                        round="rounded-5"
                        width="196"
                        height="180"
                    />

                    <BannerView
                        type="side2"
                        class="mt-2"
                        round="rounded-5"
                        width="196"
                        height="180"
                    />

                    <BannerView
                        type="side3"
                        class="mt-2"
                        round="rounded-5"
                        width="196"
                        height="560"
                    /> -->

                    <!-- <v-sheet
                        width="196"
                        height="180"
                        outlined
                        class="mt-2 rounded-5 d-flex justify-center align-center"
                    >
                        <p class="text-h6 text-center no_drag mt-6 mb-0 grey--text font-weight-regular" style="line-height:24px;">
                            배너광고<br/>
                            <span class="text-caption">광고 게시 문의</span>
                        </p>
                    </v-sheet>

                    <v-sheet
                        width="196"
                        height="180"
                        outlined
                        class="mt-2 rounded-5 d-flex justify-center align-center"
                    >
                        <p class="text-h6 text-center no_drag mt-6 mb-0 grey--text font-weight-regular" style="line-height:24px;">
                            배너광고<br/>
                            <span class="text-caption">광고 게시 문의</span>
                        </p>
                    </v-sheet>

                    <v-sheet
                        width="196"
                        height="560"
                        outlined
                        class="mt-2 rounded-5 d-flex justify-center align-center"
                    >
                        <p class="text-h6 text-center no_drag mt-6 mb-0 grey--text font-weight-regular" style="line-height:24px;">
                            배너광고<br/>
                            <span class="text-caption">광고 게시 문의</span>
                        </p>
                    </v-sheet> -->
                </v-sheet>
                    
                <v-spacer></v-spacer>
                <!-- 목록 -->
                <div v-if="$route.query.type == 'list'">
                    <EstimateList
                        v-if="loading"
                        :list="list"
                        :key="key"
                    />
                </div>

                <!-- 읽기 -->
                <div v-if="$route.query.type == 'read'">
                    <EstimateRead />
                </div>

                <!-- 수정 -->
                <div v-if="$route.query.type == 'update'">
                    <EstimateUpdate />
                </div>
            </v-sheet>
        </v-sheet>
    </div>
</template>
<script>
import EstimateList from '@/views/estimate/list'
import EstimateRead from '@/views/estimate/read'
import EstimateUpdate from '@/views/estimate/update'

export default {
    components: {
        EstimateList,
        EstimateRead,
        EstimateUpdate
    },

    data: () => ({
        // 검색 키워드 선택목록
        select_list: {
            field: [
                "전기/전자",
                "의료",
                "자동차",
                "건축/건설/토목",
                "화학/재료/소재",
                "기계",
                "IT/SW",
                "환경",
                "기타"
            ],

            sequence: [
                "최신순",
                "오래된순",
            ]
        },

        // 검색 키워드
        keyword: {
            total: "",
            category: "",
            product_name: "",
            amount: "",
            pay_date: "",
            deadline: ""
        },

        // 순서
        type: "전체",
        sequence: "최신순",

        // 목록
        list: [],

        // 페이징
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,

        key: 0,

        loading: false
    }),

    mounted() {
        if(!this.$route.query.keyword){
            // 첫 목록 불러오기
            this.load()
        }else{
            this.keyword.total = this.$route.query.keyword

            // 검색
            this.search()
        }
    },

    methods: {
        // 첫 목록
        load(){
            this.loading = false

            this.$http.post('/api/estimate_request/select/list', {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data

                this.keyword.total = ""
                this.keyword.category = ""
                this.keyword.product_name = ""
                this.keyword.amount = ""
                this.keyword.pay_date = ""
                this.keyword.deadline = ""

                this.loading = true
            })
        },

        // 검색
        search(){
            this.loading = false

            this.$http.post('/api/estimate_request/select/search', {
                params: {
                    total: this.keyword.total,
                    category: this.keyword.category,
                    product_name: this.keyword.product_name,
                    amount: this.keyword.amount,
                    pay_date: this.keyword.pay_date,
                    deadline: this.keyword.deadline
                }
            }).then((res) => {
                this.list = res.data
                this.key++
                this.loading = true
            })
        },

        // 게시글로 이동
        read(item){
            this.$router.push("/estimate?type=read&id="+item.id)
        }
    }
}
</script>
<style scoped>
::v-deep .v-text-field input {
    margin-left:2px;
}
</style>
<style scoped>
/* 입력칸 */
.v-text-field--outlined >>> fieldset {
    border-color: #E0E0EB;
}

::v-deep .v-text-field input {
    margin-left:4px;
    font-size: 16px;
}

::v-deep .v-pagination__item {
    width: 38px;
    height: 40px;
    border-radius: 10px;
    background:#DFDFDF !important;
    color:white !important;
    box-shadow:none;
}

::v-deep .v-pagination__item--active {
    width: 38px;
    height: 40px;
    border-radius: 10px;
    background:#2196F3 !important;
    color:white !important;
    box-shadow:none;
}

::v-deep .v-pagination__navigation {
    width: 38px;
    height: 40px;
    border-radius: 10px;
    background:#DFDFDF !important;
    box-shadow:none;
}

::v-deep .v-pagination__navigation .v-icon{
    color:white;
}
</style>