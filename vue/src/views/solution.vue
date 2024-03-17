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

                    <!-- Total 검색 -->
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

                    <!-- 카테고리 -->
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

                    <!-- 제목 검색 -->
                    <v-text-field
                        class="rounded-lg mt-2"
                        hide-details
                        outlined
                        dense
                        placeholder="제목"
                        v-model="keyword.title"
                        @keyup.enter="search()"
                    ></v-text-field>

                    <!-- 내용 검색 -->
                    <v-text-field
                        class="rounded-lg mt-2"
                        hide-details
                        outlined
                        dense
                        placeholder="내용"
                        v-model="keyword.content"
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
                </v-sheet>
                    
                <v-spacer></v-spacer>
                <!-- 목록 -->
                <div v-if="$route.query.type == 'list'">
                    <SolutionList
                        v-if="loading"
                        :list="list"
                        :key="key"
                    />
                </div>

                <!-- 읽기 -->
                <div v-if="$route.query.type == 'read'">
                    <SolutionRead />
                </div>

                <!-- 작성 -->
                <div v-if="$route.query.type == 'create'">
                    <SolutionCreate />
                </div>

                <!-- 수정 -->
                <div v-if="$route.query.type == 'update'">
                    <SolutionUpdate />
                </div>
            </v-sheet>
        </v-sheet>
    </div>
</template>
<script>
import SolutionList from '@/views/solution/list'
import SolutionRead from '@/views/solution/read'
import SolutionCreate from '@/views/solution/create'
import SolutionUpdate from '@/views/solution/update'

export default {
    components: {
        SolutionList,
        SolutionRead,
        SolutionCreate,
        SolutionUpdate
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
            title: "",
            content: ""
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

            this.$http.post('/api/solution/select/list', {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data
                this.matchThumbnail()

                this.keyword.total = ""
                this.keyword.category = ""
                this.keyword.title = ""
                this.keyword.content = ""

                this.loading = true
            })
        },

        // 검색
        search(){
            this.loading = false

            this.$http.post('/api/solution/select/search', {
                params: {
                    user_id: this.$store.state.asap_user.user_id,
                    total: this.keyword.total,
                    category: this.keyword.category,
                    title: this.keyword.title,
                    content: this.keyword.content,
                }
            }).then((res) => {
                this.list = res.data
                this.matchThumbnail()
                this.key++

                this.loading = true
            })
        },

        // 게시글로 이동
        read(item){
            this.$router.push("/solution?type=read&id="+item.id)
        },

        // 썸네일 추가
        matchThumbnail(){
            // 이미지
            const imgReg = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i
            const customImgReg = /<customimage[^>]*src=["']?([^>"']+)["']?[^>]*>/i

            this.list.forEach(e => {
                if(e.content.match(customImgReg))
                {
                    e.image = e.content.match(customImgReg)[0].replace(/.*src="([^"]*)".*/, '$1')
                }
                else if(e.content.match(imgReg))
                {
                    e.image = e.content.match(imgReg)[0].replace(/.*src="([^"]*)".*/, '$1')
                }
            })
        },
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