<template>
    <v-sheet class="pa-2 ma-4 rounded-lg" outlined>
        <v-data-table
            id="custom_list"
            :headers="headers"
            :items="list"
            :footer-props="{
                'items-per-page-options': [5, 20, 100, -1],
                'items-per-page-text':'페이지당 제품/솔루션 즐겨찾기 수'
            }"
            no-data-text="제품/솔루션 즐겨찾기 없습니다."
        >
            <template v-slot:item="{ item }">
                <tr style="cursor:pointer;" @click="link(item)">
                    <td style="width:86px">
                        <v-img
                            class="mx-auto"
                            height="50"
                            width="70"
                            :src="item.image"
                        ></v-img>
                    </td>
                    <td>
                        <v-sheet
                            style="width:320px"
                            class="text-truncate"
                            color="transparent"
                        >
                            {{item.title}}
                        </v-sheet>
                    </td>
                    <td>
                        <v-sheet
                            style="width:480px"
                            class="text-truncate"
                            color="transparent"
                        >
                            {{removeHTML(item.content)}}
                        </v-sheet>
                    </td>
                    <td style="width:200px">
                        {{new Date(item.created).toLocaleString()}}
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-sheet>
</template>
<script>
export default {
    data: () => ({               
        headers: [
            {text: '썸네일', value: 'thumbnail'},
            {text: '제목', value: 'title'},
            {text: '내용', value: 'content'},
            {text: '작성 일자', value: 'created'}
        ],

        list: []
    }),

    mounted(){
        // 목록
        this.load()
    },

    methods: {
        // 목록
        load(){
            this.$http.post("/api/solution/select/writer/scraped", {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data

                this.matchThumbnail()
            })
        },

        // 제품/솔루션 읽기로 이동
        link(item){
            this.$router.push("/solution?type=read&id="+item.id)
        },

        // HTML 제거
        removeHTML(string){
            return string.replace(/<[^>]*>?/g, '')
        },

        // 썸네일 추가
        matchThumbnail(){
            // 이미지
            const imgReg = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i

            this.list.forEach(e => {
                if(e.content.match(imgReg))
                {
                    e.image = e.content.match(imgReg)[0].replace(/.*src="([^"]*)".*/, '$1')
                }
            })
        },
    }
}
</script>
<style>
#custom_list{
    border:1px solid #efefef;
}

#custom_list tr th{
    background:#f7f7f7;
}

#custom_list tr th, #custom_list tr td{
    padding:8px;
}

#custom_list tr th:not(:last-child), #custom_list tr td:not(:last-child){
    border-right:1px solid #efefef;
}
</style>