<template>
    <v-sheet
        width="950"
        outlined
        class="rounded-10"
    >
        <!-- 본문 -->
        <v-sheet
            class="pa-6 rounded-10"
            @drop.prevent="onDrop" 
            @dragover="checkDrop($event)" 
            @paste="checkPaste($event)"
        >
            <p class="text-h6 mb-3">
                <v-icon color="blue" class="mb-1 mr-1">mdi-layers-edit</v-icon>
                제품/솔루션 작성하기
            </p>

            <!-- 상단 (카테고리 & 제목) -->
            <div class="d-flex mb-2">
                <!-- 카테고리 -->
                <v-sheet
                    class="pa-1 mt-2 mr-2 rounded-10"
                    width="300"
                    outlined
                >
                    <v-select
                        solo
                        flat
                        dense
                        hide-details
                        :items="select_list.category"
                        placeholder="카테고리"
                        v-model="category"
                    ></v-select>
                </v-sheet>

                <!-- 제목 -->
                <v-sheet
                    width="100%"
                    class="pa-1 mt-2 rounded-10"
                    outlined
                >
                    <v-text-field
                        hide-details
                        dense
                        placeholder="제목을 입력해주세요"
                        solo
                        flat
                        v-model="title"
                    ></v-text-field>
                </v-sheet>
            </div>

            <!-- 본문 -->
            <TipTapWriter
                v-if="options.content"
                class="tiptap_style mb-4"
                :options="options"
            />

            <v-file-input
                outlined
                show-size
                hide-details
                prepend-icon
                color="blue"
                class="rounded-lg"
                label="파일 첨부"
                v-model="uploadFile"
            >
                <template v-slot:prepend-inner>
                    <v-icon class="mr-1" color="blue">mdi-file-chart-outline</v-icon>
                </template>
            </v-file-input>

            <!-- 버튼 -->
            <div class="mt-6 d-flex justify-center">
                <!-- 제출 -->
                <v-btn
                    width="110"
                    height="42"
                    dark
                    depressed
                    color="blue"
                    class="font-weight-bold rounded-lg mr-4"
                    @click="submit()"
                >
                    작성
                </v-btn>

                <!-- 취소 -->
                <v-btn
                    width="110"
                    height="42"
                    depressed
                    color="grey"
                    dark
                    class="font-weight-bold rounded-lg"
                    @click="close()"
                >
                    취소
                </v-btn>
            </div>
        </v-sheet>
    </v-sheet>
</template>
<script>
import TipTapWriter from "@/components/tiptap/Writer"

export default {
    components: {
        TipTapWriter
    },

    data: () => ({
        select_list: {
            category: [
                "전기/전자",
                "의료",
                "자동차",
                "건축/건설/토목",
                "화학/재료/소재",
                "기계",
                "IT/SW",
                "환경",
                "기타"
            ]
        },

        writer: "",
        category: "",
        title: "",
        content: "",
        attachment: "",
        view_count: "",
        created: "",

        uploadFile: {},

        //TipTap
        options: {
            content: '',
            editable: true,
            supportImage: true,
            supportVideo: true
        }
    }),

    mounted(){
        // 게시글 정보 가져오기
        this.$http.post('/api/solution/select/specific', {
            params: {
                id: this.$route.query.id
            }
        }).then((res) => {
            this.writer = res.data[0].writer
            this.category = res.data[0].category
            this.title = res.data[0].title
            this.options.content = res.data[0].content
            this.attachment = res.data[0].attachment
            this.view_count = res.data[0].view_count
            this.created = res.data[0].created
        })
    },

    methods: {
        // Copy & Paste (파일 있을시 파일 업로드 Call)
        checkPaste(e){
            console.log(e)
        },

        // Drag & Drop (기본 이벤트 차단)
        checkDrop(e) {
            e.preventDefault()
        },

        // Drag & Drop (파일 업로드 Call)
        async onDrop(e){
            let file = e.dataTransfer.files[0]
            this.uploadFile = file
        },

        close(){
            this.$router.go(-1)
        },
        
        // 제출
        submit: _.debounce(function() {
            if(this.category == "")
            {
                alert("카테고리를 선택해주세요")
            }
            else if(this.title == "")
            {
                alert("제목을 입력해주세요")
            }
            else
            {
                if(this.uploadFile.name)
                {
                    var file = this.uploadFile
                    var formData = new FormData()
                    formData.append("image", file)
                    this.$http.post('/api/file/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        params: {
                            type: "solution/attachment"
                        }
                    }).then((res_attachment) => {
                        // 제품/솔루션 수정
                        this.$http.post("/api/solution/update", {
                            params: {
                                writer: this.$store.state.asap_user.user_id,
                                category: this.category,
                                title: this.title,
                                content: this.options.content,
                                attachment: res_attachment.data,
                                id: this.$route.query.id
                            }
                        }).then((res) => {
                            if(!res.data.affectedRows)
                            {
                                alert("제품/솔루션 수정 도중 오류가 발생하였습니다\n반복 시 고객센터에 문의바랍니다.")
                            }
                            else
                            {
                                alert("제품/솔루션이 수정되었습니다.")
                                this.$router.push("/solution?type=read&id="+this.$route.query.id)
                            }
                        })
                    })
                }
                else{
                    // 제품/솔루션 수정
                    this.$http.post("/api/solution/update", {
                        params: {
                            writer: this.$store.state.asap_user.user_id,
                            category: this.category,
                            title: this.title,
                            content: this.options.content,
                            id: this.$route.query.id
                        }
                    }).then((res) => {
                        if(!res.data.affectedRows)
                        {
                            alert("제품/솔루션 수정 도중 오류가 발생하였습니다\n반복 시 고객센터에 문의바랍니다.")
                        }
                        else
                        {
                            alert("제품/솔루션이 수정되었습니다.")
                            this.$router.push("/solution?type=read&id="+this.$route.query.id)
                        }
                    })
                }
            }
        }, 500)
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