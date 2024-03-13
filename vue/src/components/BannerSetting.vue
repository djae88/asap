<template>
    <table class="table_style">
        <tr>
            <td rowspan="5">
                <p class="text-h6 font-weight-bold text-center mb-0">{{title}}</p>
                <p class="text-h6 font-weight-bold text-center mb-0">이미지</p>
                <p class="text-caption font-weight-bold text-center">({{width}}x{{height==null? "이미지 높이" : height}})</p>
            </td>
        </tr>           
        <tr>
            <td class="ma-0 pa-0" style="background:white; text-align:center;">
                <v-sheet class="d-flex justify-center pa-4">
                    <v-img
                        :src="'/upload/banner/'+encodeURI(banner_image)" 
                        :width="width" 
                        :height="height"
                    ></v-img>
                </v-sheet>
            </td>
        </tr>           
        <tr>
            <td class="py-2 px-3" style="background:white;">
                <v-file-input
                    placeholder="업로드할 이미지를 선택해주세요"
                    outlined
                    dense
                    show-size
                    hide-details
                    prepend-icon
                    color="primary"
                    v-model="uploadImage"
                >
                    <template v-slot:prepend-inner>
                        <v-icon class="mr-1" color="primary">mdi-image-filter-hdr</v-icon>
                    </template>
                </v-file-input>
            </td>
        </tr>           
        <tr>
            <td class="py-2 px-3" style="background:white;">
                <v-sheet outlined class="px-1 rounded">
                    <v-text-field
                        solo flat hide-details
                        placeholder="링크할 주소를 입력해주세요"
                        v-model="link"
                    ></v-text-field>
                </v-sheet>
            </td>
        </tr>           
        <tr>
            <td class="py-2 px-3">
                <v-btn
                    @click="banner_submit()"
                    depressed block dark color="primary"
                >
                    배너 설정하기
                </v-btn>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props: ["title", "type", "width", "height"],

    data: () => ({
        banner_image: "",
        link:"",
        uploadImage: null
    }),

    mounted(){
        this.$http.post('/api/admin/banner/import', {
            params: {
                type: this.type,
            }
        }).then((res) => {
            this.banner_image=res.data[0].banner_image
            this.link=res.data[0].link
        })
    },

    methods: {
        // 링크만 수정
        only_link(){
            this.$http.post('/api/admin/banner/update/link', {
                params: {
                    link: this.link,
                    type: this.type
                }
            }).then(() => {
                alert("배너 링크가 수정되었습니다.")
            })
        },
        
        // 링크와 이미지 같이 수정
        image_and_link: _.debounce(function() {
            var file = this.uploadImage
            var formData = new FormData()
            formData.append("image", file)
            this.$http.post('/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    type: "banner"
                }
            }).then((res) => {
                this.banner_image = res.data
                this.$http.post('/api/admin/banner/update/both', {
                    params: {
                        image: res.data,
                        link: this.link,
                        type: this.type,
                    }
                }).then(() => {
                    alert("배너 설정이 수정되었습니다.")
                })
            })
        }, 500),

        // 배너 수정 제출하기
        banner_submit(){
            if(this.uploadImage == null){
                this.only_link()
            }else{
                this.image_and_link()
            }
        }
    }
}
</script>
<style scoped>
.table_style{
    border:1px solid #ccc;
    border-collapse: collapse;
}

.table_style tr td{
    border:1px solid #ccc;
    padding:10px;
}

</style>