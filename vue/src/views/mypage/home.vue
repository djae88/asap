<template>
    <v-sheet
        class="py-16"
        color="#f9f9f9"
        min-height="800"
    >
        <!-- 마이페이지 상단 -->
        <Summary />

        <!-- 목록 -->
        <v-sheet 
            class="mb-16 mx-auto pa-1 rounded"
            width="1200"
            style="position:relative; border:1px solid #eee;"
        >
            <!-- 탭 제목 -->
            <v-tabs
                v-model="tabs"
                height="64"
                color="primary"
            >
                <v-tab
                    v-for="item in menu"
                    :key="item"
                    class="text-subtitle-1 px-10 font-weight-medium"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-divider></v-divider>

            <!-- 탭 본문 -->
            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <EstimateRequestList />
                </v-tab-item>
                <v-tab-item>
                    <EstimateApplyList />
                </v-tab-item>
                <v-tab-item>
                    <SolutionList />
                </v-tab-item>
                <v-tab-item>
                    <EstimateRequestScrapList />
                </v-tab-item>
                <v-tab-item>
                    <SolutionScrapList />
                </v-tab-item>
            </v-tabs-items>
        </v-sheet>
    </v-sheet>
</template>
<script>
// 마이페이지 상단
import Summary from "@/views/mypage/components/Summary"

// 탭
import EstimateRequestList from "@/views/mypage/components/tabs/EstimateRequestList"
import EstimateApplyList from "@/views/mypage/components/tabs/EstimateApplyList"
import SolutionList from "@/views/mypage/components/tabs/SolutionList"
import EstimateRequestScrapList from "@/views/mypage/components/tabs/EstimateRequestScrapList"
import SolutionScrapList from "@/views/mypage/components/tabs/SolutionScrapList"

export default {
    components: {
        Summary,
        EstimateRequestList,
        EstimateApplyList,
        SolutionList,
        EstimateRequestScrapList,
        SolutionScrapList
    },

    data: () => ({
        tabs: null,
        menu: [
            "견적요청 내역",
            "견적작성 내역",
            "제품/솔루션 내역",
            "견적요청 즐겨찾기",
            "제품/솔루션 즐겨찾기"
        ]
    })
}
</script>