<template>
    <div>
        <!-- 제목 -->
        <v-sheet outlined class="d-flex align-center ma-2 px-4" height="60">
            <font class="font-weight-bold text-h6 grey--text text--darken-2">견적요청 관리</font>
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
                        'itemsPerPageText': '페이지당 견적요청 수'
                    }"
                    no-data-text=""
                >
                    <template v-slot:header>
                        <tr>
                            <th style="width:52px;"></th>
                            <th style="width:164px">썸네일</th>
                            <th style="width:220px">카테고리</th>
                            <th style="width:100%">품명</th>
                            <th style="width:140px">수량</th>
                            <th style="width:200px">필요한 시기</th>
                            <th style="width:200px">마감기한</th>
                            <th style="width:220px">작성일자</th>
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
                                        :src="'/upload/estimate/thumbnail/'+item.thumbnail"
                                    ></v-img>
                                </v-sheet>
                            </td>
                            <td>
                                <v-select
                                    hide-details
                                    outlined
                                    dense
                                    :items="select_list.category"
                                    v-model="item.category"
                                    @change="update_category(item)"
                                ></v-select>
                            </td>
                            <td class="text-truncate">
                                {{item.product_name}}
                            </td>
                            <td class="text-truncate">
                                {{item.amount}}
                            </td>
                            <td class="text-truncate">
                                {{item.pay_date}}
                            </td>
                            <td class="text-truncate">
                                {{item.deadline}}
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
        select_list: {
            category: [
                "전기/전자",
                "의료",
                "자동차",
                "건축/건설/토목",
                "화학/재료/소재",
                "기계",
                "IT/SW",
                "환경",
                "기타"
            ]
        },
        
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
            this.$http.post('/api/estimate_request/select/list', {
                params: {
                    user_id: this.$store.state.asap_user.user_id
                }
            }).then((res) => {
                this.list = res.data
            })
        },

        // 카테고리 수정하기
        update_category(item){
            this.$http.post('/api/estimate_request/update/category', {
                params: {
                    category: item.category,
                    id: item.id
                }
            }).then((res) => {
                if(res.data.affectedRows){
                    alert("카테고리가 변경되었습니다.")
                }
            })
        },

        // 삭제하기
        deleteItem(){
            if(!Object.keys(this.selectedItem).length){
                alert("선택한 견적요청이 없습니다")
            }else{
                if(confirm("정말 해당 견적요청을 삭제하겠습니까?")){
                    this.$http.post('/api/estimate_request/delete', {
                        params: {
                            id: this.selectedItem.id
                        }
                    }).then((res) => {
                        if(res.data.affectedRows){
                            alert("해당 견적요청이 삭제되었습니다.")
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