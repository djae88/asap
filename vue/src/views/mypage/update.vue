<template>
    <v-sheet
        class="py-16"
        color="#f9f9f9"
        min-height="800"
    >
        <!-- 마이페이지 상단 -->
        <Summary />

        <!-- 목록 -->
        <v-sheet 
            class="mb-16 mx-auto pa-1 rounded"
            width="1200"
            style="position:relative; border:1px solid #eee;"
        >
            <v-sheet height="64" width="100%" class="d-flex justify-center align-center">
                <p class="text-subtitle-1 my-0 font-weight-medium grey--text text--darken-2">
                    프로필 수정하기
                </p>
            </v-sheet>
            <v-divider></v-divider>
            <v-sheet class="pa-10">
                <v-sheet class="grey lighten-4 pt-6 pb-10">
                    <p class="text-center font-weight-medium mb-2">프로필 이미지</p>
                    <p class="text-center text-caption">원하시는 기본 이미지를 선택하여 프로필 이미지를 변경해 보세요.</p>
                    <v-sheet color="transparent" class="d-flex justify-center mx-auto mt-8" width="600">
                        <v-avatar
                            @click="profile = 'default_m1'; updateProfile()"
                            class="mx-2"
                            style="cursor:pointer;"
                            :style="profile == 'default_m1'? 'outline:3px solid #2196F3;':''"
                            color="rgb(219, 219, 219)"
                            size="80"
                        >
                            <v-img src="@/assets/profile/default_m1.png"></v-img>
                        </v-avatar>
                        <v-avatar
                            @click="profile = 'default_m2'; updateProfile()"
                            class="mx-2"
                            style="cursor:pointer;"
                            :style="profile == 'default_m2'? 'outline:3px solid #2196F3;':''"
                            color="rgb(219, 219, 219)"
                            size="80"
                        >
                            <v-img src="@/assets/profile/default_m2.png"></v-img>
                        </v-avatar>
                        <v-avatar
                            @click="profile = 'default_m3'; updateProfile()"
                            class="mx-2"
                            style="cursor:pointer;"
                            :style="profile == 'default_m3'? 'outline:3px solid #2196F3;':''"
                            color="rgb(219, 219, 219)"
                            size="80"
                        >
                            <v-img src="@/assets/profile/default_m3.png"></v-img>
                        </v-avatar>
                        <v-avatar
                            @click="profile = 'default_w1'; updateProfile()"
                            class="mx-2"
                            style="cursor:pointer;"
                            :style="profile == 'default_w1'? 'outline:3px solid #2196F3;':''"
                            color="rgb(219, 219, 219)"
                            size="80"
                        >
                            <v-img src="@/assets/profile/default_w1.png"></v-img>
                        </v-avatar>
                        <v-avatar
                            @click="profile = 'default_w2'; updateProfile()"
                            class="mx-2"
                            style="cursor:pointer;"
                            :style="profile == 'default_w2'? 'outline:3px solid #2196F3;':''"
                            color="rgb(219, 219, 219)"
                            size="80"
                        >
                            <v-img src="@/assets/profile/default_w2.png"></v-img>
                        </v-avatar>
                        <v-avatar
                            @click="profile = 'default_w3'; updateProfile()"
                            class="mx-2"
                            style="cursor:pointer;"
                            :style="profile == 'default_w3'? 'outline:3px solid #2196F3;':''"
                            color="rgb(219, 219, 219)"
                            size="80"
                        >
                            <v-img src="@/assets/profile/default_w3.png"></v-img>
                        </v-avatar>
                    </v-sheet>
                    <p class="text-center text-caption mt-8 grey--text">선택한 이미지는 바로 프로필에 반영됩니다.</p>
                </v-sheet>
                <v-sheet class="d-flex justify-center">
                    <v-btn
                        class="mt-10 rounded-lg font-weight-regular"
                        width="280"
                        color="primary"
                        depressed
                        dark
                        large
                        to="/mypage/home"
                    >
                        마이페이지로 돌아가기
                    </v-btn>
                </v-sheet>
            </v-sheet>
        </v-sheet>
    </v-sheet>
</template>
<script>
// 마이페이지 상단
import Summary from "@/views/mypage/components/Summary"

import { mapMutations } from 'vuex'

export default {
    components: {
        Summary
    },

    data: () => ({
        profile: ""
    }),

    created(){
        this.profile = this.$store.state.asap_user.profile_image.replace('.png', '')
    },

    methods: {
        ...mapMutations(['update_profile_image']),

        updateProfile(){
            this.$http.post('/api/mypage/update/profile_image', {
                params: {
                    user_id: this.$store.state.asap_user.user_id,
                    image: this.profile+".png"
                }
            }).then(() => {
                this.update_profile_image(this.profile+'.png')
            })
        }
    }
}
</script>