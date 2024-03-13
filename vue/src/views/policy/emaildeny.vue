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
                    이메일무단수집거부
                </h2>

                <p>본 사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며 이를 위반 시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다</p>
                <h3>부칙</h3>
                <p>본 이메일무단수집거부 정책은 2023년 5월 1일 공고 2023년 5월 1일부터 시행합니다.</p>
            </div>
        </v-sheet>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({
        
    }),

    mounted(){
        window.scrollTo(0, 0)
    }
}
</script>
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