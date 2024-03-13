<template>
    <v-sheet
        class="pt-16"
        style="padding-bottom:240px;"
        color="#f9f9f9"
    >
        <v-sheet 
            color="white" 
            class="mx-auto"
            width="1200"
            style="position:relative;"
        >
            <v-sheet
                width="540"
                height="28"
                color="blue"
                style="position:absolute; top:-14px; left:340px; box-shadow:0px 1px 10px #ccc;"
            ></v-sheet>
            <div class="rule_box pt-10 pa-16">
                <!-- 제목 -->
                <h2
                    class="text-center mb-10 mt-2"
                    style="letter-spacing:2px"
                >
                    건의사항
                </h2>

                <v-sheet
                    max-width="380"
                    outlined
                    class="py-3 px-10 rounded-30 mx-auto mb-2"
                    style="cursor:pointer;"
                    @click="$copyText('keynes30@naver.com'); snackbar = true"
                >
                    <p
                        class="my-2 text-subtitle-1 font-weight-bold text-center"
                    >
                        keynes30@naver.com
                    </p>
                </v-sheet>

                <p
                    class="text-caption text-center primary--text mb-12"
                >
                    {{snackbar? '이메일이 복사되었습니다':'이메일을 클릭하시면 복사됩니다'}}
                </p>

                <p
                    class="text-center mb-2"
                >
                    건의하실 내용은 위의 이메일로 보내주세요
                </p>
                <p
                    class="text-center primary--text font-weight-medium"
                >
                    감사합니다
                </p>
            </div>
        </v-sheet>

        <!-- 스낵바 -->
        <v-snackbar
            min-width="0"
            min-height="0"
            content-class="pa-0"
            top
            light
            v-model="snackbar"
            :timeout="2000"
            :action="null"
        >
            <v-sheet
                class="primary py-3 px-16 white--text text-center"
            >
                이메일이 복사되었습니다
            </v-sheet>
        </v-snackbar>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        snackbar: false
    }),

    mounted(){
        window.scrollTo(0, 0)
    }
}
</script>
<style scoped>
::v-deep .v-snack__action {
    display: none;
}
</style>
<style>
.rule_box{
    overflow:auto;
    border:1px solid #e9e9e9;
    text-align:left;
    padding:10px;
}

.rule_box h3{
    color:#2196F3;
}

.in_table{
    width:100%;
    border:1px solid #e0e0e0;
    border-collapse: collapse;
    margin-bottom:20px;
}

.in_table tr{
    height:50px;
}

.in_table tr th:first-child{
    width:130px;
}

.in_table tr th{
    background:#efefef;
    padding:5px;
    border:1px solid #e0e0e0;
}

.in_table tr td{
    width:25%;
    padding:5px;
    border:1px solid #e0e0e0;
}
</style>