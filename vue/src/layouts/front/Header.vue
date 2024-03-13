<template>
    <div style="border-bottom:2px solid #90CAF9">
        <v-sheet
            height="90"
            width="1200"
            class="d-flex align-center mx-auto"
        >
            <!-- 로고 -->
            <v-sheet 
                width="250"
                class="d-flex justify-center mr-10"
            >
                <v-img
                    v-if="!$route.path.startsWith('/estimate')"
                    height="40"
                    width="66"
                    style="cursor:pointer"
                    contain
                    src="@/assets/logo/default.png"
                    @click="$router.push('/')"
                ></v-img>
                <v-img
                    v-if="$route.path.startsWith('/estimate')"
                    height="40"
                    width="66"
                    style="cursor:pointer"
                    contain
                    src="@/assets/logo/band.png"
                    @click="$router.push('/')"
                ></v-img>
            </v-sheet>

            <!-- 메뉴 -->
            <div>
                <v-btn
                    v-ripple="false"
                    class="text-subtitle-1 font-weight-medium mr-6"
                    text
                    large
                    active-class="primary--text"
                    exact
                    to="/"
                >
                    견적요청
                </v-btn>
                <v-btn
                    v-ripple="false"
                    class="text-subtitle-1 font-weight-medium mr-6"
                    text
                    large
                    active-class="primary--text"
                    exact
                    to="/estimate?type=list"
                >
                    견적요청 목록
                </v-btn>
                <v-btn
                    v-ripple="false"
                    class="text-subtitle-1 font-weight-medium mr-7"
                    text
                    large
                    active-class="primary--text"
                    exact
                    to="/solution?type=list"
                >
                    제품/솔루션
                </v-btn>
                <v-btn
                    v-ripple="false"
                    class="text-subtitle-1 font-weight-medium"
                    text
                    large
                    active-class="primary--text"
                    exact
                    to="/suggestion"
                >
                    고객센터
                </v-btn>
            </div>
            <v-spacer></v-spacer>

            <!-- 비로그인 상태 -->
            <div v-if="!$store.state.asap_user.is_logined">
                <v-btn
                    class="font-weight-medium mr-4 px-6 rounded-xl"
                    depressed
                    color="blue"
                    dark
                    to="/auth/join/agree"
                >
                    회원가입
                </v-btn>
                <v-btn
                    v-ripple="false"
                    class="font-weight-bold mr-4"
                    text
                    to="/auth/login"
                >
                    로그인
                </v-btn>
            </div>

            <!-- 로그인 상태 (채팅) -->
            <div
                v-if="$store.state.asap_user.is_logined"
                class="mr-8"
            >
                <!-- 채팅 내역이 있을때 -->
                <v-badge
                    v-if="message_unwatched!=0"
                    color="error"
                    :content="message_unwatched"
                    offset-x="28"
                    offset-y="10"
                >
                    <v-btn
                        width="24"
                        height="24"
                        fab
                        text
                        depressed
                        class="custom-btn"
                        v-ripple="false"
                        to="/message"
                    >
                        <v-icon
                            class="mr-10"
                            color="blue"
                            style="cursor:pointer;"
                        >
                            mdi-email-outline
                        </v-icon>
                    </v-btn>
                </v-badge>

                <!-- 채팅 내역이 없을때 -->
                <v-btn
                    v-if="message_unwatched==0"
                    width="24"
                    height="24"
                    fab
                    text
                    depressed
                    class="custom-btn"
                    v-ripple="false"
                    to="/message"
                >
                    <v-icon
                        class="mr-10"
                        color="grey"
                        style="cursor:pointer;"
                    >
                        mdi-email-outline
                    </v-icon>
                </v-btn>
            </div>

            <!-- 로그인 상태 (프로필) -->
            <div
                v-if="$store.state.asap_user.is_logined"
                class="d-flex mr-12"
            >
                <v-menu
                    transition="scroll-y-transition"
                    open-delay="200"
                    offset-y
                    open-on-hover
                    content-class="elevation-0"
                    nudge-right="-56"
                    nudge-bottom="11"
                    close-delay="200"
                >
                    <!-- 프로필 이미지 -->

                    <template v-slot:activator="{ on: menu }">
                        <v-avatar
                            class="ml-2 mr-2"
                            color="rgb(219, 219, 219)"
                            size="40"
                            v-on="{ ...menu }"
                            style="cursor:pointer;"
                        >
                            <v-img
                                :src="require('@/assets/profile/'+$store.state.asap_user.profile_image)"
                            ></v-img>
                        </v-avatar>
                    </template>

                    <!-- 목록 -->
                    <v-list width="150" class="text-center rounded-lg pt-2 pb-3" color="primary">
                        <!-- 유저아이디 -->
                        <v-subheader v-if="$store.state.asap_user.is_logined" class="mb-1">
                            <v-sheet class="mx-auto text-center" color="transparent">
                                <p class="text-body-1 mb-0 font-weight-bold white--text">{{$store.state.asap_user.user_id}}</p>
                            </v-sheet>
                        </v-subheader>

                        <!-- 관리자 페이지 -->
                        <v-list-item dense exact v-if="$store.state.asap_user.user_id=='root'" :to="$store.state.asap_user.is_logined? '/admin/dashboard':'admin/login'">
                            <v-list-item-title class="custom-list white--text font-weight-regular" style="font-size:15px; cursor:pointer;">
                                관리자페이지
                            </v-list-item-title>
                        </v-list-item>

                        <!-- 마이페이지 -->
                        <v-list-item dense exact to="/mypage/home">
                            <v-list-item-title class="custom-list white--text font-weight-regular" style="font-size:15px; cursor:pointer;">
                                마이페이지
                            </v-list-item-title>
                        </v-list-item>

                        <!-- 로그아웃 -->
                        <v-list-item dense exact to="/auth/logout">
                            <v-list-item-title class="custom-list white--text font-weight-regular" style="font-size:15px; cursor:pointer;">
                                로그아웃
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-sheet>
    </div>
</template>
<script>
export default {
    data: () => ({
        message_unwatched: 0
    })
}
</script>
<style scoped>
.v-btn::before {
    background-color: transparent;
}
</style>