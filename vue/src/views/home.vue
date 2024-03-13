<template>
    <div>
        <!-- 견적 요청 -->
        <v-sheet
            color="#f9f9f9"
            height="900"
        >
            <Apply />
        </v-sheet>

        <!-- 검색 -->
        <v-sheet
            height="540"
            class="blue lighten-1"
        >
            <Search />
        </v-sheet>

        <!-- 업체 광고 배너 -->
        <!-- <v-sheet
            height="900"
            class="blue lighten-1"
        >
            <CompanyAds />
        </v-sheet> -->

        <!-- 새로 올라온 견적 -->
        <v-sheet height="900">
            <NewEstimateVue />
        </v-sheet>
    </div>
</template>
<script>
import Apply from './home/Apply'
import Search from './home/Search'
import CompanyAds from './home/CompanyAds'
import NewEstimateVue from './home/NewEstimate'

export default {
    components: {
        Apply,
        Search,
        CompanyAds,
        NewEstimateVue
    }
}
</script>