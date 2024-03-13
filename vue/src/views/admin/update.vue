<template>
    <div>
        <!-- 제목 -->
        <v-sheet outlined class="d-flex align-center ma-2 px-4" height="60">
            <font class="font-weight-bold text-h6 grey--text text--darken-2">관리자 정보수정</font>
        </v-sheet>

        <!-- 본문 -->
        <v-sheet outlined class="ma-2 pa-4 pb-16">
            <v-sheet width="300">
                <p
                    class="text-subtitle-1 font-weight-medium"
                >
                    관리자 정보수정
                </p>
                <v-text-field
                    class="grey lighten-4 mb-3"
                    color="primary"
                    outlined
                    dense
                    readonly
                    hide-details
                    label="관리자 아이디"
                    v-model="user_id"
                ></v-text-field>
                <v-text-field
                    color="primary"
                    outlined
                    dense
                    hide-details
                    type="password"
                    label="관리자 비밀번호"
                    v-model="password"
                    @keyup.enter="submit()"
                ></v-text-field>

                <v-btn
                    class="mt-4"
                    depressed
                    dark
                    large
                    color="primary"
                    block
                    @click="submit()"
                >
                    수정하기
                </v-btn>
            </v-sheet>
        </v-sheet>
    </div>
</template>
<script>
export default {
    data: () => ({
        user_id: "",
        password: ""
    }),

    mounted(){
        // 관리자 정보 불러오기
        this.load()
    },

    methods: {
        // 관리자 정보 불러오기
        load(){
            this.$http.post('/api/admin/update/load')
            .then((res) => {
                this.user_id = res.data[0].user_id
            })
        },

        // 관리자 정보 수정하기
        submit(){
            if(this.password == ""){
                alert("변경하실 관리자 비밀번호를 입력해주세요.")
            }else{
                this.$http.post('/api/admin/update/submit', {
                    params: {
                        user_id: this.user_id,
                        password: this.password
                    }
                }).then((res) => {
                    if(!res.data.affectedRows){
                        alert("관리자 정보를 수정하는 중에 오류가 발생하였습니다")
                    }else{
                        alert("관리자 정보가 수정되었습니다.")
                        this.load()
                    }
                })
            }
        }
    }
}
</script>