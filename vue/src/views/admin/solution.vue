<template>
    <div>
        <!-- 제목 -->
        <v-sheet outlined class="d-flex align-center ma-2 px-4" height="60">
            <font class="font-weight-bold text-h6 grey--text text--darken-2">제품/솔루션 관리</font>
        </v-sheet>

        <!-- 본문 -->
        <v-sheet outlined class="pa-2 ma-2">
            <!-- 목록 -->
            <v-radio-group v-model="selected" hide-details>
                <v-data-table
                    hide-default-header
                    :items="list"
                    :footer-props="{
                        'items-per-page-options': [4, 20, 100, -1],
                        'itemsPerPageText': '페이지당 제품/솔루션 수'
                    }"
                    no-data-text=""
                >
                    <template v-slot:header>
                        <tr>
                            <th style="width:52px;"></th>
                            <th style="width:164px">썸네일</th>
                            <th style="width:240px">카테고리</th>
                            <th style="width:300px">제목</th>
                            <th style="width:100%">내용</th>
                            <th style="width:240px">작성일자</th>
                        </tr>
                    </template>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>
                                <v-radio
                                    class="ml-1"
                                    hide-details
                                    dense
                                    :value="item"
                                    @change="selectedItem = item"
                                ></v-radio>
                            </td>
                            <td class="px-3">
                                <v-sheet
                                    class="mx-auto"
                                    color="transparent"
                                >
                                    <v-img
                                        height="100"
                                        width="140"
                                        :src="item.image"
                                    ></v-img>
                                </v-sheet>
                            </td>
                            <td class="text-truncate">
                                {{item.category}}
                            </td>
                            <td class="text-truncate">
                                {{item.title}}
                            </td>
                            <td class="px-4">
                                <v-sheet
                                    height="40"
                                    style="overflow:hidden;"
                                    color="transparent"
                                >
                                    {{removeHTML(item.content)}}
                                </v-sheet>
                            </td>
                            <td>
                                {{new Date(item.created).toLocaleString()}}
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-radio-group>

            <!-- 버튼 -->
            <v-card class="mt-2 pa-2 d-flex justify-end" outlined>
                <v-btn
                    class="px-6 ml-3"
                    color="red"
                    large
                    dark
                    depressed
                    @click="deleteItem()"
                >
                    <v-icon small left>mdi-database-remove-outline</v-icon>
                    삭제하기
                </v-btn>
            </v-card>
        </v-sheet>
    </div>
</template>
<script>
export default {
    data: () => ({
        list: [],

        selected: false,
        selectedItem: {},

        //TipTap
        options: {
            content: '',
            editable: true,
            supportImage: true,
            supportVideo: true,
        }
    }),

    mounted(){
        // 목록
        this.load()
    },

    methods: {
        // 목록
        load(){
            this.$http.post('/api/solution/select/list', {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data

                this.matchThumbnail()
            })
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

        // 삭제하기
        deleteItem(){
            if(!Object.keys(this.selectedItem).length){
                alert("선택한 제품/솔루션이 없습니다")
            }else{
                if(confirm("정말 해당 제품/솔루션을 삭제하겠습니까?")){
                    this.$http.post('/api/solution/delete', {
                        params: {
                            id: this.selectedItem.id
                        }
                    }).then((res) => {
                        if(res.data.affectedRows){
                            alert("해당 제품/솔루션이 삭제되었습니다.")
                            this.load()
                        }
                    })
                }
            }
        }
    }
}
</script>
<style scoped>
/* Table (수정하기, 추가하기) */
.customTable{
    border:1px solid #efefef;
    border-collapse: collapse;
}

.customTable tr td:first-child{
    text-align: center;
    font-weight: bold;
    background:#f2f2f2;
    height:50px;
    width:140px;
    padding:10px;
    border:1px solid #dedede;
}

.customTable tr td{
    height:50px;
    width:700px;
    padding:10px;
    border:1px solid #dedede;
}

.my-clipper {
    width:100%;
}

.placeholder {
    width:100%;
    height:220px;
}

.updatetable{
    border:1px solid #efefef;
    border-collapse: collapse;
}

.updatetable tr td{
    height:50px;
    padding:10px;
    border:1px solid #dedede;
}

.updatetable tr th{
    background:#f2f2f2;
    text-align: left;
    padding:10px;
    border:1px solid #dedede;
}
</style>