<template>
    <v-card
        class="mx-auto"
        width="256"
        tile
        color="#313942"
    >
        <v-img
            width="120"
            class="mx-auto mt-12"
            src="@/assets/logo/white.png"
        ></v-img>

        <p class="text-center white--text mt-6 mb-2">
            관리자 페이지
        </p>
        <v-divider color="grey" class="mx-16"></v-divider>
        
        <div class="d-flex justify-center my-6">
            <v-btn
                v-if="$store.state.asap_admin.is_logined"
                class="rounded-lg"
                color="grey lighten-1"
                outlined
                to="/admin/auth/logout"
            >
                관리자 로그아웃
            </v-btn>
        </div>

        <!-- 메뉴 그룹 -->
        <v-list
            nav
            dense
            color="#313942"
        >
            <v-list-item-group
                v-model="selected"
                color="primary"
            >
                <!-- 메뉴 -->
                <v-list-item
                    v-for="(item, index) in menu" :key="index"
                    :to="item.link"
                    class="py-1"
                >
                    <!-- 아이콘 -->
                    <v-list-item-icon>
                        <v-icon color="white">{{item.icon}}</v-icon>
                    </v-list-item-icon>

                    <!-- 제목 -->
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{item.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        menu: [
            { 
                text: "배너 관리",
                icon: "mdi-image-outline",
                link: "/admin/banner"
            },
            { 
                text: "견적요청 관리",
                icon: "mdi-text-box-outline",
                link: "/admin/estimate"
            },
            { 
                text: "제품/솔루션 관리",
                icon: "mdi-electron-framework",
                link: "/admin/solution"
            },
            { 
                text: "회원 관리",
                icon: "mdi-account",
                link: "/admin/user"
            },
            { 
                text: "관리자 정보수정",
                icon: "mdi-shield-edit-outline",
                link: "/admin/update"
            },
        ],

        selected: ""
    })
}
</script>