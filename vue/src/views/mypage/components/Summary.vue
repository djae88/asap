<template>
    <v-sheet 
        class="mb-8 mx-auto rounded-lg pa-1"
        width="1200"
        height="160"
        style="position:relative; border:1px solid #eee;"
    >
        <!-- 본문 상단 클립 디자인 -->
        <v-sheet
            width="200"
            height="28"
            class="primary"
            style="position:absolute; top:-14px; left:40px; box-shadow:0px 1px 10px #ccc;"
        >
            <span class="font-italic white--text text-caption ml-4">Asap Profile</span>
        </v-sheet>

        <!-- 본문 -->
        <v-sheet class="d-flex align-center" height="100%">
            <!-- 프로필 -->
            <v-sheet
                class="pa-8 pt-10"
                width="420"
                height="100%"
            >
                <v-sheet class="d-flex align-center">
                    <v-avatar class="ml-2 mr-7" color="rgb(219, 219, 219)" size="80">
                        <v-img :src="require('@/assets/profile/'+$store.state.asap_user.profile_image)"></v-img>
                    </v-avatar>
                    <v-sheet>
                        <p class="mb-1 text-body-2 grey--text text--darken-2 font-weight-light">{{$store.state.asap_user.user_id}}</p>
                    </v-sheet>
                    <v-btn
                        class="ml-10"
                        text
                        rounded
                        color="grey"
                        to="/mypage/update"
                    >
                        <span class="mr-1 pb-2px text-subtitle-1">수정</span>
                        <v-icon color="primary">mdi-cog-outline</v-icon>
                    </v-btn>
                </v-sheet>
            </v-sheet>

            <!-- 구분선 -->
            <v-sheet width="1" height="120" color="grey lighten-2" class="mx-8"></v-sheet>

            <!-- 요약 정보 -->
            <v-sheet
                class="pa-8 d-flex justify-space-between text-center"
                width="800"
                height="100%"
            >
                <!-- 견적요청 -->
                <v-card
                    width="120"
                    outlined
                    class="pt-4 rounded-lg"
                >
                    <p class="mb-2 pb-2px text-body-2 font-weight-medium grey--text text--darken-1">
                        견적요청
                    </p>
                    <v-sheet class="d-flex justify-center align-center">
                        <span class="primary--text ml-2px">{{$toComma(user.estimate_request)}}개</span>
                    </v-sheet>
                </v-card>

                <!-- 견적작성 -->
                <v-card
                    width="120"
                    outlined
                    class="pt-4 rounded-lg"
                >
                    <p class="mb-2 pb-2px text-body-2 font-weight-medium grey--text text--darken-1">
                        견적작성
                    </p>
                    <v-sheet class="d-flex justify-center align-center">
                        <span class="primary--text ml-2px">{{$toComma(user.estimate)}}개</span>
                    </v-sheet>
                </v-card>

                <!-- 제품/솔루션 -->
                <v-card
                    width="120"
                    outlined
                    class="pt-4 rounded-lg"
                >
                    <p class="mb-2 pb-2px text-body-2 font-weight-medium grey--text text--darken-1">
                        제품/솔루션
                    </p>
                    <v-sheet class="d-flex justify-center align-center">
                        <span class="primary--text ml-2px">{{$toComma(user.solution)}}개</span>
                    </v-sheet>
                </v-card>

                <!-- 스크랩 -->
                <v-card
                    width="120"
                    outlined
                    class="pt-4 rounded-lg"
                >
                    <p class="mb-2 pb-2px text-body-2 font-weight-medium grey--text text--darken-1">
                        스크랩
                    </p>
                    <v-sheet class="d-flex justify-center align-center">
                        <span class="primary--text ml-2px">{{$toComma(user.scraped)}}개</span>
                    </v-sheet>
                </v-card>

                <!-- 가입일 -->
                <v-card
                    width="120"
                    outlined
                    class="pt-4 rounded-lg"
                >
                    <p class="mb-2 pb-2px text-body-2 font-weight-medium grey--text text--darken-1">
                        가입일
                    </p>
                    <v-sheet class="d-flex justify-center align-center">
                        <span class="primary--text ml-2px">{{new Date($store.state.asap_user.created).toLocaleDateString().slice(0, -1)}}</span>
                    </v-sheet>
                </v-card>
            </v-sheet>
        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        user: {
            estimate_request: 0,
            estimate: 0,
            solution: 0,
            scraped: 0
        }
    }),

    mounted(){
        // 견적요청 수
        this.$http.post("/api/estimate_request/select/writer", {
            params: {
                user_id: this.$store.state.asap_user.user_id
            }
        }).then((res) => {
            this.user.estimate_request = res.data.length
        })

        // 견적작성 수
        this.$http.post("/api/estimate/select/writer", {
            params: {
                user_id: this.$store.state.asap_user.user_id
            }
        }).then((res) => {
            this.user.estimate = res.data.length
        })

        // 제품/솔루션 수
        this.$http.post("/api/solution/select/writer", {
            params: {
                user_id: this.$store.state.asap_user.user_id
            }
        }).then((res) => {
            this.user.solution = res.data.length
        })

        // 스크랩 수
        this.$http.post("/api/estimate_request/select/writer/scraped", {
            params: {
                user_id: this.$store.state.asap_user.user_id
            }
        }).then((res) => {
            this.user.scraped = res.data.length

            this.$http.post("/api/solution/select/writer/scraped", {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.user.scraped += res.data.length
            })
        })
    }
}
</script>