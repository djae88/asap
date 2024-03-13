<template>
    <v-app>
        <v-sheet class="d-flex" height="100%">
            <Side />
            <v-main
                class="adminCustomStyle"
                style="background:#f8f8f8;"
            >
                <!-- <Header /> -->
                <router-view :key="$route.fullPath"></router-view>
            </v-main>
        </v-sheet>
    </v-app>
</template>

<script>
import Side from './Side'
import Header from './Header'

export default {
    components: {
        Side,
        Header
    },

    created(){
        // 관리자 검증
        if(!this.$route.path.startsWith('/admin/auth')){
            if(!this.$store.state.asap_admin.is_logined){
                alert("해당 페이지에대한 접근 권한이 없습니다.")
                this.$router.push('/admin/auth/login')
            }
        }
    }
}
</script>
<style>
/* Flexible table 위해 */
.adminCustomStyle {
    width:300px;
}

/* v-data-table 공통 스타일 */
.adminCustomStyle .theme--light.v-data-table {
    border:1px solid #efefef;
}

.adminCustomStyle .theme--light.v-data-table > .v-data-table__wrapper > table {
    table-layout:fixed !important;
}

.adminCustomStyle .theme--light.v-data-table > .v-data-table__wrapper > table > tr > th {
    background:#f7f7f7;
    padding:12px 10px;
    text-align: left;
    font-weight:medium;
    font-size:12px;
    color:#555;
}

.adminCustomStyle .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    padding:10px;
}

/* 세로선 */
.adminCustomStyle .theme--light.v-data-table > .v-data-table__wrapper > table > tr > th:not(:last-child),
.adminCustomStyle .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(:last-child) {
    border-right:1px solid #efefef;
}
</style>