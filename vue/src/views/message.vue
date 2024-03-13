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
                    width="300"
                    class="rounded-lg pa-4"
                    outlined
                >
                    <!-- 검색 -->
                    <v-sheet class="d-flex mb-4">
                        <!-- 입력란 -->
                        <v-text-field
                            class="rounded-10"
                            height="40"
                            placeholder="검색"
                            outlined
                            dense
                            hide-details
                            v-model="keyword"
                            @keyup.enter="channelSearch()"
                        >
                            <template v-slot:append>
                                <v-icon size="24" color="#424361">mdi-magnify</v-icon>
                            </template>
                        </v-text-field>

                        <!-- 버튼 -->
                        <v-btn
                            class="rounded-10 ml-2"
                            width="60"
                            height="40"
                            depressed
                            dark
                            color="primary"
                            @click="channelSearch()"
                        >
                            검색
                        </v-btn>
                    </v-sheet>

                    <v-sheet
                        v-if="channel_list.length"
                    >
                        <v-sheet
                            v-for="(item, index) in channel_list" :key="index"
                        >
                            <v-sheet
                                class="pl-3 pr-2 my-2 py-3 rounded-10"
                                outlined
                                style="cursor:pointer"
                                @click="select_channel(item.talk_user)"
                            >
                                <!-- 프로필 -->
                                <div class="d-flex justify-space-between">
                                    <Profile
                                        v-if="item.talk_user != ''"
                                        :user="item.talk_user"
                                        size="default"
                                    />

                                    <p
                                        class="mb-0 pr-1"
                                        style="font-size:11px; color:#B3B3C2;"
                                    >
                                        {{new Date(item.created).toLocaleDateString()}}
                                    </p>
                                </div>

                                <v-sheet class="custom-truncate text-caption mt-2 ml-2px">
                                    {{item.content}}
                                </v-sheet>
                            </v-sheet>
                        </v-sheet>
                    </v-sheet>
                    <v-sheet v-if="!channel_list.length">
                        <v-sheet
                            class="d-flex align-center justify-center grey--text text-body-2 rounded-lg mb-4"
                            outlined
                            height="480"
                        >
                            <p>아직 채팅 내역이 없습니다</p>
                        </v-sheet>
                    </v-sheet>
                </v-sheet>
                    
                <v-spacer></v-spacer>
                <!-- 본문 -->
                <v-sheet
                    width="880"
                    class="rounded-lg px-6 pt-7 pb-6"
                    outlined
                >
                    <p
                        v-if="talk_user.user_id == ''"
                        class="text-body-2 grey--text pb-6px px-2 d-flex align-center"
                    >
                        <v-icon color="primary" class="mr-2">mdi-cancel</v-icon>
                        아직 선택된 대화상대가 없습니다.
                    </p>

                    <Profile
                        v-if="talk_user.user_id != ''"
                        :user="talk_user.user_id"
                        size="large"
                    />

                    <v-divider class="mt-4"></v-divider>

                    <v-sheet
                        min-height="400"
                        max-height="600"
                        style="overflow-y:scroll"
                        class="pr-4 mt-2"
                    >
                        <v-sheet class="mx-2" v-for="(item, index) in message_list" :key="index">
                            <v-sheet class="d-flex align-end mt-4" :class="item.sender==$store.state.asap_user.user_id? 'justify-end':'justify-start'">
                                <!-- 채팅 시간 -->
                                <v-sheet v-if="item.sender==$store.state.asap_user.user_id">
                                    <p class="mb-0 mr-2 text-end" style="font-size:9px; color:#B3B3C2;">
                                        {{new Date(item.created).toLocaleDateString()}}
                                    </p>
                                    <p class="mb-0 mr-2 text-end" style="font-size:9px; color:#B3B3C2;">
                                        {{new Date(item.created).toLocaleTimeString()}}
                                    </p>
                                </v-sheet>

                                <!-- 일반 채팅 -->
                                <v-sheet
                                    v-if="item.type=='text'"
                                    class="px-4 py-2 rounded-10"
                                    :style="item.sender==$store.state.asap_user.user_id? 'background:#FFEE66':'background:#eeeeee'"
                                    max-width="60%"
                                >
                                    {{item.content}}
                                </v-sheet>

                                <!-- 일반 채팅 -->
                                <v-sheet
                                    v-if="item.type=='estimate'"
                                    class="px-10 py-4 rounded-10"
                                    :style="item.sender==$store.state.asap_user.user_id? 'background:#FFEE66':'background:#eeeeee'"
                                    max-width="60%"
                                >
                                    <p
                                        class="font-weight-medium text-center"
                                    >
                                        견적이 발송되었습니다
                                    </p>
                                    <v-btn
                                        block
                                        class="rounded-10"
                                        color="primary"
                                        dark
                                        depressed
                                        @click="estimate_id = item.estimate_id; dialog.estimate = true"
                                    >
                                        견적 확인해보기
                                    </v-btn>
                                </v-sheet>

                                <!-- 채팅 시간 -->
                                <v-sheet v-if="!(item.sender==$store.state.asap_user.user_id)">
                                    <p class="mb-0 ml-2" style="font-size:9px; color:#B3B3C2;">
                                        {{new Date(item.created).toLocaleDateString()}}
                                    </p>
                                    <p class="mb-0 ml-2" style="font-size:9px; color:#B3B3C2;">
                                        {{new Date(item.created).toLocaleTimeString()}}
                                        <v-icon
                                            v-if="item.type=='message'"
                                            v-ripple="false"
                                            title="채팅 신고하기"
                                            size="12"
                                            class="ml-2px mb-2px"
                                            color="red"
                                            style="background-color:none; cursor:pointer;"
                                            @click="report_message_open(item)"
                                        >
                                            mdi-alert-circle
                                        </v-icon>
                                    </p>
                                </v-sheet>
                            </v-sheet>
                        </v-sheet>
                    </v-sheet>

                    <!-- 메시지 입력 -->
                    <v-sheet class="mt-6 d-flex align-end">
                        <v-sheet outlined class="rounded-10 pa-1" min-height="48" width="100%">
                            <v-textarea
                                rows="1"
                                auto-grow
                                dense
                                solo
                                flat
                                hide-details
                                placeholder="메시지를 입력해주세요"
                                v-model="message"
                                @keyup.enter="sendMessage()"
                            ></v-textarea>
                        </v-sheet>
                        <v-btn
                            class="ml-3 rounded-10"
                            height="48"
                            width="80"
                            depressed
                            dark
                            color="primary"
                            @click="sendMessage()"
                        >
                            전송
                        </v-btn>
                    </v-sheet>
                </v-sheet>
            </v-sheet>
        </v-sheet>

        <!-- 견적 상세보기 (dialog) -->
        <v-dialog
            v-model="dialog.estimate"
            width="auto"
            content-class="rounded-xl"
        >
            <EstimateView
                :id="estimate_id"
            />
        </v-dialog>
    </div>
</template>
<script>
import EstimateView from "@/views/message/components/EstimateView"
import Profile from "@/components/Profile"

export default {
    components: {
        EstimateView,
        Profile
    },

    data: () => ({
        user_list: [],
        keyword: "",
        message: "",

        key: 0,

        talk_user: {
            user_id: '',
            profile_image: ''
        },

        channel_list: [],
        message_list: [],

        dialog: {
            estimate: false
        },

        estimate_id: null
    }),

    mounted() {
        if(this.$route.query.to){
            this.to = this.$route.query.to

            this.importUserProfile(this.to)
        }else{
            this.loadChannelList()
        }
    },

    methods: {
        // 채널 검색
        channelSearch(){
            this.$http.post('/api/user/select/specific', {
                params: {
                    user_id: this.keyword
                }
            }).then(res => {
                if(!res.data.length){
                    alert("해당 아이디는 존재하지 않습니다.")
                }else{
                    this.talk_user = res.data[0]
                    this.loadMessage()
                }
            })
        },
        
        // 유저 정보 가져오기
        importUserProfile(user_id){
            this.$http.post('/api/user/select/specific', {
                params: {
                    user_id: user_id
                }
            }).then(res => {
                this.talk_user = res.data[0]
                this.loadMessage()
                this.loadChannelList()
            })
        },

        // 채팅 목록 불러오기
        loadMessage(){
            this.$http.post('/api/message/select/list', {
                params: {
                    talk_user: this.talk_user.user_id,
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.message_list = res.data
            })
        },

        // 채팅 보내기
        sendMessage(){
            if(!this.message.length){
                alert("채팅 내용을 입력해주세요")
            }else if(this.message.length > 1000){
                alert("채팅 내용은 1,000자 이내로 입력해주세요")
            }else{
                this.$http.post('/api/message/insert', {
                    params: {
                        type: "text",
                        sender: this.$store.state.asap_user.user_id,
                        receiver: this.talk_user.user_id,
                        content: this.message,
                        image: null,
                        attachment: null,
                        estimate_id: null
                    }
                }).then(res => {
                    if(res.data.affectedRows){
                        this.loadMessage()
                        this.loadChannelList()
                        this.message = ""
                    }
                })
            }
        },

        // 채널 목록
        async loadChannelList(){
            // 내가 보낸 목록
            let me_send_list = []
            await this.$http.post('/api/message/select/channel/list/me/send', {
                params: {
                    user_id : this.$store.state.asap_user.user_id
                }
            }).then(res => {
                me_send_list = res.data.map(e => e.receiver)
            })

            // 내가 받은 목록
            let me_receive_list = []
            await this.$http.post('/api/message/select/channel/list/me/recieve', {
                params: {
                    user_id : this.$store.state.asap_user.user_id
                }
            }).then(res => {
                me_receive_list = res.data.map(e => e.sender)
            })

            // 합산
            let sum = 
            [
                ...new Set(
                    [
                        ...me_send_list,
                        ...me_receive_list
                    ]
                )
            ]

            // 채널 목록 표시
            this.channel_list = []
            for(let i=0; i<sum.length; i++){
                await this.$http.post('/api/message/select/channel/list/detailForList', {
                    params: {
                        me: this.$store.state.asap_user.user_id,
                        other: sum[i]
                    }
                }).then(res => {
                    this.channel_list.push(res.data[0])
                })
            }

            // 날짜 순 정렬
            this.channel_list.sort((a,b) => {
                return new Date(b.created) - new Date(a.created)
            })
        },

        // 선택한 채널
        select_channel(user_id){
            this.importUserProfile(user_id)
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
</style>
<style>
.custom-truncate{
    display: -webkit-box;
    max-width: 230px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>