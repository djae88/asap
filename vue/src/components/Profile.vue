<template>
    <v-menu
        v-if="user_profile"
        offset-y
        open-on-hover
        content-class="rounded-10"
        min-width="120"
        open-delay="160"
        nudge-bottom="10"
        close-delay="160"
    >
        <template v-slot:activator="{ on: menu }">
            <v-sheet
                style="cursor:pointer;"
                class="d-flex align-center"
                color="transparent"
                v-on="{ ...menu }"
            >
                <!-- 프로필 이미지 -->
                <v-avatar :size="size=='large'? 30:20">
                    <v-img
                        :src="computedProfileImage"
                    ></v-img>
                </v-avatar>

                <!-- 유저 아이디 -->
                <font
                    class="text-truncate"
                    :class="size=='large'? 'ml-2':'ml-1'"
                    :style="size=='large'? 'font-size:18px': 'font-size:12px'"
                >
                    {{user_profile.user_id}}
                </font>
            </v-sheet>
        </template>
        <v-card
            min-width="120"
            class="pt-5 pb-4 rounded-10"
        >
            <v-list
                class="pa-0 text-center"
                dense
            >
                <!-- 프로필 이미지 -->
                <v-list-item>
                    <v-list-item-title class="px-0">
                        <v-avatar size="34">
                            <v-img
                                :src="computedProfileImage"
                            ></v-img>
                        </v-avatar>
                    </v-list-item-title>
                </v-list-item>

                <!-- 유저 아이디 -->
                <v-list-item class="mb-2">
                    <v-list-item-title class="px-0">{{user_profile.user_id}}</v-list-item-title>
                </v-list-item>

                <!-- 메세지 -->
                <v-list-item
                    @click="sendMessage()"
                >
                    <v-list-item-title class="px-0">
                        <v-icon color="primary" small class="mb-2px mr-1">mdi-email</v-icon>메세지
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>
<script>
export default {
    props: ["user", "size"],

    data: () => ({
        user_profile: {
            profile_image: ""
        },
    }),

    mounted(){
        this.importUserProfile()
    },

    watch: {
        user: {
            deep:true,
            handler(newData) {
                this.importUserProfile()
            }
        }
    },

    computed: {
        computedProfileImage() {
            if(this.user_profile.profile_image != ""){
                return require(`@/assets/profile/${this.user_profile.profile_image}`)
            }
        }
    },

    methods: {
        // 유저 정보 가져오기
        importUserProfile(){
            this.$http.post('/api/user/select/specific', {
                params: {
                    user_id: this.user
                }
            }).then(res => {
                this.user_profile = res.data[0]
            })
        },

        // 메세지
        sendMessage(){
            if(this.$store.state.asap_user.user_id == this.user){
                alert("자신에게는 쪽지를 보낼 수 없습니다.")
            }else{
                this.$router.push('/message?to='+this.user_profile.user_id)
            }
        }
    }
}
</script>
