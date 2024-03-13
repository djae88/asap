<template>
    <v-sheet 
        :width="width"
        :height="height"
        :class="round"
        style="cursor:pointer"
        @click="goToLink()"
    >
        <v-img
            :height="height"
            :width="width"
            :class="round"
            :src="'/upload/banner/'+encodeURI(banner_image)"
        >
        <v-sheet
            :height="height"
            :width="width"
            class="d-flex justify-center align-center"
            color="transparent"
        >
            <p class="text-h6 text-center no_drag mb-0 white--text font-weight-regular">
                업체 광고 배너
            </p>
        </v-sheet>
        </v-img>
    </v-sheet>
</template>
<script>
export default {
    props: [
        "round",
        "type",
        "width",
        "height"
    ],

    data: () => ({
        banner_image: "",
        link: ""
    }),

    created(){
        this.$http.post('/api/admin/banner/import', {
            params: {
                type: this.type,
            }
        }).then((res) => {
            this.banner_image = res.data[0].banner_image
            this.link = res.data[0].link
        })
    },

    methods: {
        goToLink(){
            window.open(this.link, '_blank')
        }
    }
}
</script>