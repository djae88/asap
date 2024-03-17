<template>
    <v-sheet
        width="950"
        outlined
        class="rounded-10"
    >
        <!-- 본문 -->
        <v-sheet class="pa-4 rounded-10">
            <!-- 상단 -->
            <v-sheet
                v-if="!$vuetify.breakpoint.xs"
                class="pt-3 pb-1 px-2 d-flex align-end"
            >
                <p
                    style="width:440px; font-size:18px;"
                    class="ma-0 text-truncate"
                >
                    <!-- 제목 -->
                    <span class="font-weight-bold text-h6">
                        {{product_name}}
                    </span>
                    <v-icon color="red" size="24" class="mb-6px">mdi-alpha-n-box</v-icon>
                    <br/>

                    <!-- 부제목 -->
                    <v-sheet
                        class="d-flex align-center"
                        style="white-space:pre-line; font-size:13px; height:34px; line-height:18px; overflow:hidden;"
                    >
                        <Profile
                            :user="writer"
                            size="default"
                        />
                        <span class="mx-2">|</span>
                        <span>수량: {{amount}}</span>
                        <span class="mx-2">|</span>
                        <span>일자: {{pay_date}}</span>
                        <span class="mx-2">|</span>
                        <span>마감기한: {{deadline}}</span>
                    </v-sheet>
                    
                </p>
                <v-spacer></v-spacer>

                <v-btn
                    class="mb-8"
                    v-ripple="false"
                    height="40"
                    x-small
                    depressed
                    style="background:white; border:1px solid #ccc;"
                    color="blue--text text--lighten-3"
                    @click.stop="scrap()"
                >
                    <v-icon v-if="is_scraped==0" size="20" color="grey lighten-1">mdi-star</v-icon>
                    <v-icon v-if="is_scraped!=0" size="20" color="blue">mdi-star</v-icon>
                </v-btn>
            </v-sheet>

            <!-- 내용 -->
            <v-divider class="mt-0 mb-3 mx-2"></v-divider>

            <v-img
                v-if="thumbnail != 'default.png'"
                class="mx-2"
                max-width="360"
                :src="'/upload/estimate/thumbnail/'+encodeURI(thumbnail)"
            ></v-img>

            <v-sheet
                class="pa-3 mb-10"
                style="white-space:pre-line;"
            >
                {{memo}}
            </v-sheet>

            <!-- 첨부파일 -->
            <p
                v-if="attachment"
                class="pl-3 mb-0 text-caption"
            >
                <v-icon small class="mb-2px mr-1" color="primary">mdi-attachment</v-icon>
                첨부파일
            </p>
            <v-sheet
                v-if="attachment"
                class="pa-3 mb-6"
            >
                <v-btn
                    depressed
                    class="py-6 rounded-10"
                    @click="download(attachment)"
                >
                    <v-icon size="20" class="mt-1 mr-2" color="primary">mdi-file</v-icon>
                    {{attachment}}
                </v-btn>
            </v-sheet>

            <v-divider class="mb-4 mx-2"></v-divider>
            <v-sheet
                class="px-2 d-flex justify-space-between"
            >
                <v-btn
                    height="40"
                    dark
                    depressed
                    class="px-6 mr-3"
                    color="primary"
                    to="/estimate?type=list"
                >
                    목록
                </v-btn>
                <v-btn
                    v-if="writer == $store.state.asap_user.user_id"
                    height="40"
                    dark
                    depressed
                    class="px-6 mr-3"
                    color="primary"
                    @click="updateEstimate()"
                >
                    수정
                </v-btn>
                <v-btn
                    v-if="writer == $store.state.asap_user.user_id"
                    height="40"
                    dark
                    depressed
                    class="px-6"
                    color="primary"
                    @click="deleteEstimate()"
                >
                    삭제
                </v-btn>
                
                <v-spacer></v-spacer>
                <v-btn
                    v-if="$store.state.asap_user.is_logined && $store.state.asap_user.user_id != writer"
                    height="40"
                    dark
                    depressed
                    class="px-6"
                    color="primary"
                    @click="dialog.apply = true"
                >
                    <v-icon size="16" left>mdi-pencil</v-icon>
                    견적 작성하기
                </v-btn>
                <v-btn
                    v-if="$store.state.asap_user.is_logined && $store.state.asap_user.user_id != writer"
                    height="40"
                    dark
                    depressed
                    class="ml-3 px-6"
                    color="primary"
                    @click="dialog.apply = true"
                    :to="'/message?to='+writer"
                >
                    채팅하기
                </v-btn>
            </v-sheet>
        </v-sheet>

        <!-- 견적 작성하기 (dialog) -->
        <v-dialog
            v-model="dialog.apply"
            width="auto"
            content-class="rounded-xl"
        >
            <EstimateApply
                :requestor="writer"
            />
        </v-dialog>
    </v-sheet>
</template>
<script>
import Profile from "@/components/Profile"
import EstimateApply from "./read/EstimateApply"

export default {
    components: {
        Profile,
        EstimateApply
    },

    data: () => ({
        writer: "",
        product_name: "",
        amount: "",
        pay_date: "",
        deadline: "",
        memo: "",
        thumbnail: "",
        attachment: "",
        view_count: "",
        created: "",
        is_scraped: "",

        dialog: {
            apply: false,
            detail: false
        }
    }),

    mounted(){
        // 게시글 정보 가져오기
        this.$http.post('/api/estimate_request/select/specific', {
            params: {
                user_id: this.$store.state.asap_user.user_id,
                id: this.$route.query.id
            }
        }).then((res) => {
            this.writer = res.data[0].writer
            this.product_name = res.data[0].product_name
            this.amount = res.data[0].amount
            this.pay_date = res.data[0].pay_date
            this.deadline = res.data[0].deadline
            this.memo = res.data[0].memo
            this.thumbnail = res.data[0].thumbnail
            this.attachment = res.data[0].attachment
            this.view_count = res.data[0].view_count
            this.created = res.data[0].created
            this.is_scraped = res.data[0].is_scraped
        })
    },

    methods: {
        // 스크랩하기
        scrap(){
            if(this.is_scraped == 0){
                this.$http.post("/api/estimate_request/insert/scrap", {
                    params: {
                        user_id: this.$store.state.asap_user.user_id,
                        estimate_request_id: this.$route.query.id
                    }
                }).then(() => {
                    this.is_scraped = 1
                })
            }else{
                this.$http.post("/api/estimate_request/delete/scrap", {
                    params: {
                        user_id: this.$store.state.asap_user.user_id,
                        estimate_request_id: this.$route.query.id
                    }
                }).then(() => {
                    this.is_scraped = 0
                })
            }
        },
        
        download(file) {
            this.$http.post("/api/file/download", {
                params: {
                    file: file
                }
            },
            {
                responseType: 'blob' // 응답 타입을 'blob'으로 설정
            }).then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data])) // 블롭 객체 생성
                const link = document.createElement('a') // 링크 엘리먼트 생성
                link.href = url // 링크에 다운로드 URL 설정
                link.setAttribute('download', file) // 파일 이름 설정
                document.body.appendChild(link) // 링크를 body에 추가
                link.click() // 클릭 이벤트 발생
                document.body.removeChild(link) // 링크 제거
                window.URL.revokeObjectURL(url) // 사용한 URL 해제
            })
        },

        updateEstimate(){
            this.$router.push("/estimate?type=update&id=" + this.$route.query.id)
        },

        deleteEstimate(){
            if(confirm("정말 해당 견적요청을 삭제하시겠습니까?")){
                this.$http.post("/api/estimate_request/delete", {
                    params: {
                        id: this.$route.query.id
                    }
                }).then((res) => {
                    if(res.data.affectedRows){
                        alert("견적요청이 정상적으로 삭제되었습니다.")
                        this.$router.push("/estimate?type=list")
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.no_under >>> .v-input__slot::before {
  border-style: none !important;
}

.v-btn::before {
    background-color: transparent;
}
</style>