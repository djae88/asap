<template>
    <v-sheet
        width="1200"
        class="mx-auto pt-9 px-2"
        color="transparent"
    >
        <!-- 문구 -->
        <v-sheet color="transparent" width="400" class="mx-auto">
            <div class="d-flex mx-auto">
                <v-img
                    height="40"
                    width="66"
                    contain
                    src="@/assets/logo/default.png"
                ></v-img>
            </div>
            <p class="text-center text-subtitle-1 font-weight-medium mt-2 grey--text text--darken-2">
                1분만에 익명의 견적 요청하기
            </p>
        </v-sheet>

        <!-- 견적 요청 -->
        <v-sheet
            width="600"
            class="rounded-xl mt-8 pa-10 pb-7 mx-auto"
            outlined
            @drop.prevent="onDrop" 
            @dragover="checkDrop($event)" 
            @paste="checkPaste($event)"
        >
            <p class="text-h6 mb-3">
                <v-icon color="blue" class="mb-1 mr-1">mdi-layers-edit</v-icon>
                견적요청
            </p>
            <v-textarea
                class="rounded-lg mb-4"
                rows="2"
                outlined
                hide-details
                label="제목"
                v-model="estimate.product_name"
                @change="checkLogin()"
            ></v-textarea>
            <v-text-field
                dense
                class="rounded-lg mb-4"
                outlined
                hide-details
                label="수량"
                type="number"
                placeholder="자유롭게 기술하세요"
                v-model="estimate.amount"
                @change="checkLogin()"
            ></v-text-field>
            <v-text-field
                dense
                class="rounded-lg mb-4"
                outlined
                hide-details
                label="필요한 시기"
                placeholder="자유롭게 기술하세요"
                v-model="estimate.pay_date"
                @change="checkLogin()"
            ></v-text-field>
            <v-text-field
                dense
                class="rounded-lg mb-4"
                outlined
                hide-details
                label="마감기한"
                placeholder="자유롭게 기술하세요"
                v-model="estimate.deadline"
                @change="checkLogin()"
            ></v-text-field>
            <v-textarea
                class="rounded-lg mb-4"
                rows="3"
                outlined
                hide-details
                label="내용설명"
                placeholder="제품 상품 서비스 설명 또는 이미지 드래그, 엑셀 등등 자유롭게"
                v-model="estimate.memo"
                @change="checkLogin()"
            ></v-textarea>
            <v-file-input
                outlined
                show-size
                hide-details
                prepend-icon
                color="blue"
                class="rounded-lg mb-4"
                label="관련 이미지 첨부"
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
                    확인
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
        uploadImage: {},
        uploadFile: {},

        estimate: {
            product_name: "",
            amount: 0,
            pay_date: "",
            deadline: "",
            memo: ""
        }
    }),

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

        checkLogin(){
            if(!this.$store.state.asap_user.is_logined){
                alert("견적요청은 로그인 이후 가능합니다")
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

        // 제출
        submit: _.debounce(function() {
            if(!this.$store.state.asap_user.is_logined){
                alert("견적요청은 로그인 이후 가능합니다")
                return
            }

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
                        this.$http.post("/api/estimate_request/insert", {
                            params: {
                                writer: this.$store.state.asap_user.user_id,
                                product_name: this.estimate.product_name,
                                amount: this.estimate.amount,
                                pay_date: this.estimate.pay_date,
                                deadline: this.estimate.deadline,
                                memo: this.estimate.memo,
                                thumbnail: res_image.data,
                                attachment: res_attachment.data
                            }
                        }).then((res) => {
                            if(!res.data.affectedRows){
                                alert("견적요청을 입력하는 도중 오류가 발생하였습니다")
                            }else{
                                alert("견적요청이 정상적으로 입력되었습니다")
                                this.$router.push("/estimate?type=list")
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
                    this.$http.post("/api/estimate_request/insert", {
                        params: {
                            writer: this.$store.state.asap_user.user_id,
                            product_name: this.estimate.product_name,
                            amount: this.estimate.amount,
                            pay_date: this.estimate.pay_date,
                            deadline: this.estimate.deadline,
                            memo: this.estimate.memo,
                            thumbnail: res_image.data
                        }
                    }).then((res) => {
                        if(!res.data.affectedRows){
                            alert("견적요청을 입력하는 도중 오류가 발생하였습니다")
                        }else{
                            alert("견적요청이 정상적으로 입력되었습니다")
                            this.$router.push("/estimate?type=list")
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
                    this.$http.post("/api/estimate_request/insert", {
                        params: {
                            writer: this.$store.state.asap_user.user_id,
                            product_name: this.estimate.product_name,
                            amount: this.estimate.amount,
                            pay_date: this.estimate.pay_date,
                            deadline: this.estimate.deadline,
                            memo: this.estimate.memo,
                            thumbnail: "default.png",
                            attachment: res_attachment.data
                        }
                    }).then((res) => {
                        if(!res.data.affectedRows){
                            alert("견적요청을 입력하는 도중 오류가 발생하였습니다")
                        }else{
                            alert("견적요청이 정상적으로 입력되었습니다")
                            this.$router.push("/estimate?type=list")
                        }
                    })
                })
            }
            else if(!this.uploadImage.name && !this.uploadFile.name)
            {
                // 기본 정보 DB 입력
                this.$http.post("/api/estimate_request/insert", {
                    params: {
                        writer: this.$store.state.asap_user.user_id,
                        product_name: this.estimate.product_name,
                        amount: this.estimate.amount,
                        pay_date: this.estimate.pay_date,
                        deadline: this.estimate.deadline,
                        memo: this.estimate.memo,
                        thumbnail: "default.png"
                    }
                }).then((res) => {
                    if(!res.data.affectedRows){
                        alert("견적요청을 입력하는 도중 오류가 발생하였습니다")
                    }else{
                        alert("견적요청이 정상적으로 입력되었습니다")
                        this.$router.push("/estimate?type=list")
                    }
                })
            }
        }, 500),
    }
}
</script>
<style scoped>
::v-deep .v-text-field input {
    margin-left:2px;
}
</style>