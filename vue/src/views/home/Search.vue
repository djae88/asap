<template>
    <v-sheet
        width="600"
        class="mx-auto pt-16 px-2"
        color="transparent"
    >
        <!-- 문구 -->
        <v-sheet color="transparent" width="400" class="mx-auto mt-16 mb-8">
            <div class="d-flex mx-auto">
                <v-img
                    height="40"
                    width="66"
                    contain
                    src="@/assets/logo/white.png"
                ></v-img>
            </div>
        </v-sheet>
        <p
            class="white--text text-center mb-10"
        >
            찾으시는 견적요청을 검색해보세요
        </p>
        <v-text-field
            solo
            flat
            class="rounded-10 mx-10"
            placeholder="검색 후 엔터"
            v-model="keyword"
            append-icon="mdi-magnify"
            @keyup.enter="search()"
        ></v-text-field>
    </v-sheet>
</template>
<script>
import BannerView from '@/components/BannerView'

export default {
    components: {
        BannerView
    },

    data: () => ({
        keyword: ""
    }),

    methods: {
        search(){
            this.$router.push("/estimate?type=list&keyword=" + this.keyword)
        }
    }
}
</script>