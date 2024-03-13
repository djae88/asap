<template>
    <v-sheet
        width="1200"
        class="mx-auto pt-16 px-2"
        color="transparent"
    >
        <!-- 문구 -->
        <v-sheet color="transparent" width="400" class="mx-auto">
            <div class="d-flex mx-auto">
                <v-img
                    height="40"
                    width="66"
                    contain
                    src="@/assets/logo/white.png"
                ></v-img>
            </div>
        </v-sheet>

        <!-- 배너 -->
        <v-sheet
            width="880"
            class="rounded-xl mt-14 mx-auto"
            v-for="n in 4" :key="n"
        >
            <v-sheet
                width="880"
                height="118"
                class="rounded-xl d-flex justify-center align-center"
                color="transparent"
            >
                <p class="text-h6 text-center no_drag mt-4 mb-0 grey--text font-weight-regular" style="line-height:24px;">
                    배너광고<br/>
                    <span class="text-caption">광고 게시 문의</span>
                </p>
            </v-sheet>
            <!-- <BannerView
                :type="'home'+n"
                round="rounded-xl"
                width="880"
                height="118"
            /> -->
        </v-sheet>
    </v-sheet>
</template>
<script>
import BannerView from '@/components/BannerView'

export default {
    components: {
        BannerView
    }
}
</script>