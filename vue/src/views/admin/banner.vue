<template>
    <div>
        <!-- 제목 -->
        <v-sheet outlined class="d-flex align-center ma-2 px-4" height="60">
            <font class="font-weight-bold text-h6 grey--text text--darken-2">배너 관리</font>
        </v-sheet>

        <!-- 본문 -->
        <v-sheet outlined class="ma-2 pa-4 pb-16">
            <!-- 홈 배너 설정 -->
            <p class="text-h5 font-weight-bold mb-2">홈 배너 설정</p>
            <BannerSetting class="mt-2" title="홈 배너1" type="home1" width="880" height="118" />
            <BannerSetting class="mt-2" title="홈 배너2" type="home2" width="880" height="118" />
            <BannerSetting class="mt-2" title="홈 배너3" type="home3" width="880" height="118" />
            <BannerSetting class="mt-2" title="홈 배너4" type="home4" width="880" height="118" />

            <!-- 사이드 배너 설정 -->
            <p class="text-h5 font-weight-bold mt-10 mb-2">사이드 배너 설정</p>
            <BannerSetting class="mt-2" title="사이드 배너1" type="side1" width="196" height="180" />
            <BannerSetting class="mt-2" title="사이드 배너2" type="side2" width="196" height="180" />
            <BannerSetting class="mt-2" title="사이드 배너3" type="side3" width="196" height="560" />
        </v-sheet>
    </div>
</template>
<script>
import BannerSetting from '@/components/BannerSetting'

export default {
    components: {
        BannerSetting
    }
}
</script>