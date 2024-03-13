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
                견적요청  수정하기
            </p>
            <v-textarea
                class="rounded-lg mb-4"
                rows="3"
                outlined
                hide-details
                label="품명"
                placeholder="자유롭게 기술하세요"
                v-model="product_name"
            ></v-textarea>
            <v-text-field
                dense
                class="rounded-lg mb-4"
                outlined
                hide-details
                label="수량"
                type="number"
                placeholder="자유롭게 기술하세요"
                v-model="amount"
            ></v-text-field>
            <v-text-field
                dense
                class="rounded-lg mb-4"
                outlined
                hide-details
                label="일자"
                placeholder="자유롭게 기술하세요"
                v-model="pay_date"
            ></v-text-field>
            <v-text-field
                dense
                class="rounded-lg mb-4"
                outlined
                hide-details
                label="마감기한"
                placeholder="자유롭게 기술하세요"
                v-model="deadline"
            ></v-text-field>
            <v-textarea
                class="rounded-lg mb-4"
                rows="3"
                outlined
                hide-details
                label="비고"
                placeholder="자유롭게 기술하세요"
                v-model="memo"
            ></v-textarea>
            <v-file-input
                outlined
                show-size
                hide-details
                prepend-icon
                color="blue"
                class="rounded-lg mb-4"
                label="썸네일 & 본문 이미지 파일 첨부"
                v-model="uploadImage"
            >
                <template v-slot:prepend-inner>
                    <v-icon class="mr-1" color="blue">mdi-image-outline</v-icon>
                </template>
            </v-file-input>
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
                    수정
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
export default {
    data: () => ({
        writer: "",
        product_name: "",
        amount: "",
        pay_date: "",
        deadline: "",
        memo: "",
        thumbnail: "",
        attachment: "",
        created: "",
        memo: "",

        uploadImage: {},
        uploadFile: {}
    }),

    mounted(){
        // 게시글 정보 가져오기
        this.$http.post('/api/estimate_request/select/specific', {
            params: {
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
            console.log(e)
            let file = e.dataTransfer.files[0]
            console.log(file)
            if(this.isImageFile(file)){
                this.uploadImage = file
            }else{
                this.uploadFile = file
            }
        },

        isImageFile(file) {
            // 파일 확장자 확인
            const extension = file.name.split(".").pop().toLowerCase()
            if (extension === "jpg" || extension === "png" || extension === "gif") {
                return true
            }

            // 파일 유형(MIME) 확인
            const mimeType = file.type
            if (mimeType.startsWith("image/")) {
                return true
            }
            return false
        },

        close(){
            this.$router.go(-1)
        },
        
        // 제출
        submit: _.debounce(function() {
            if(this.uploadImage.name && this.uploadFile.name)
            {
                var file = this.uploadImage
                var formData = new FormData()
                formData.append("image", file)
                this.$http.post('/api/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        type: "thumbnail"
                    }
                }).then((res_image) => {
                    var file = this.uploadFile
                    var formData = new FormData()
                    formData.append("image", file)
                    this.$http.post('/api/file/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        params: {
                            type: "attachment"
                        }
                    }).then((res_attachment) => {
                        // 기본 정보 DB 입력
                        this.$http.post("/api/estimate_request/update/thumbnail/attachment", {
                            params: {
                                writer: this.$store.state.asap_user.user_id,
                                product_name: this.product_name,
                                amount: this.amount,
                                pay_date: this.pay_date,
                                deadline: this.deadline,
                                memo: this.memo,
                                thumbnail: res_image.data,
                                attachment: res_attachment.data,
                                id: this.$route.query.id,
                            }
                        }).then((res) => {
                            if(!res.data.affectedRows){
                                alert("견적요청을 수정하는 도중 오류가 발생하였습니다")
                            }else{
                                alert("견적요청이 정상적으로 수정되었습니다")
                                this.$router.push("/estimate?type=read&id="+this.$route.query.id)
                            }
                        })
                    })
                })
            }
            else if(this.uploadImage.name && !this.uploadFile.name)
            {
                var file = this.uploadImage
                var formData = new FormData()
                formData.append("image", file)
                this.$http.post('/api/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        type: "thumbnail"
                    }
                }).then((res_image) => {
                    // 기본 정보 DB 입력
                    this.$http.post("/api/estimate_request/update/thumbnail", {
                        params: {
                            writer: this.$store.state.asap_user.user_id,
                            product_name: this.product_name,
                            amount: this.amount,
                            pay_date: this.pay_date,
                            deadline: this.deadline,
                            memo: this.memo,
                            thumbnail: res_image.data,
                            id: this.$route.query.id,
                        }
                    }).then((res) => {
                        if(!res.data.affectedRows){
                            alert("견적요청을 수정하는 도중 오류가 발생하였습니다")
                        }else{
                            alert("견적요청이 정상적으로 수정되었습니다")
                            this.$router.push("/estimate?type=read&id="+this.$route.query.id)
                        }
                    })
                })
            }
            else if(!this.uploadImage.name && this.uploadFile.name)
            {
                var file = this.uploadFile
                var formData = new FormData()
                formData.append("image", file)
                this.$http.post('/api/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        type: "attachment"
                    }
                }).then((res_attachment) => {
                    // 기본 정보 DB 입력
                    this.$http.post("/api/estimate_request/update/attachment", {
                        params: {
                            writer: this.$store.state.asap_user.user_id,
                            product_name: this.product_name,
                            amount: this.amount,
                            pay_date: this.pay_date,
                            deadline: this.deadline,
                            memo: this.memo,
                            attachment: res_attachment.data,
                            id: this.$route.query.id,
                        }
                    }).then((res) => {
                        if(!res.data.affectedRows){
                            alert("견적요청을 수정하는 도중 오류가 발생하였습니다")
                        }else{
                            alert("견적요청이 정상적으로 수정되었습니다")
                            this.$router.push("/estimate?type=read&id="+this.$route.query.id)
                        }
                    })
                })
            }
            else if(!this.uploadImage.name && !this.uploadFile.name)
            {
                // 기본 정보 DB 입력
                this.$http.post("/api/estimate_request/update", {
                    params: {
                        writer: this.$store.state.asap_user.user_id,
                        product_name: this.product_name,
                        amount: this.amount,
                        pay_date: this.pay_date,
                        deadline: this.deadline,
                        memo: this.memo,
                        id: this.$route.query.id,
                    }
                }).then((res) => {
                    console.log(res)
                    if(!res.data.affectedRows){
                        alert("견적요청을 수정하는 도중 오류가 발생하였습니다")
                    }else{
                        alert("견적요청이 정상적으로 수정되었습니다")
                        this.$router.push("/estimate?type=read&id="+this.$route.query.id)
                    }
                })
            }
        }, 500),
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