<template>
    <div>
        <!-- 제목 -->
        <v-sheet outlined class="d-flex align-center ma-2 px-4" height="60">
            <font class="font-weight-bold text-h6 grey--text text--darken-2">회원 관리</font>
        </v-sheet>

        <!-- 본문 -->
        <v-sheet outlined class="ma-2 pa-2">
            <!-- 검색 -->
            <v-sheet outlined class="pa-2 mb-4">
                <v-sheet class="d-flex" width="660">
                    <!-- 유형 -->
                    <v-sheet width="180" class="mr-3">
                        <v-select
                            outlined
                            dense
                            hide-details
                            :items="select_list.search_type"
                            v-model="search_type"
                        ></v-select>
                    </v-sheet>

                    <!-- 키워드 -->
                    <v-text-field
                        placeholder="검색어를 입력해주세요"
                        outlined
                        dense
                        hide-details
                        v-model="keyword"
                        @keyup.enter="search()"
                    ></v-text-field>

                    <!-- 제출 버튼 -->
                    <v-btn
                        height="40"
                        class="px-6 ml-3"
                        color="primary"
                        dark
                        depressed
                        @click="search()"
                    >
                        <v-icon small left>mdi-magnify</v-icon>
                        검색하기
                    </v-btn>
                </v-sheet>
            </v-sheet>

            <!-- 목록 -->
            <v-radio-group v-model="selected" hide-details>
                <v-data-table
                    hide-default-header
                    :items="list"
                    :footer-props="{
                        'items-per-page-options': [8, 20, 100, -1],
                        'itemsPerPageText': '페이지당 사용자 수'
                    }"
                    no-data-text=""
                >
                    <template v-slot:header>
                        <tr>
                            <th style="width:52px;"></th>
                            <th style="width:100%">유저 아이디</th>
                            <th style="width:180px">견적요청 수</th>
                            <th style="width:180px">견적서 작성 수</th>
                            <th style="width:180px">제품/솔루션 수</th>
                            <th style="width:280px">이메일 주소</th>
                            <th style="width:220px">이메일 인증</th>
                            <th style="width:280px">가입일자</th>
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
                            <td><font class="d-block text-truncate" style="width:120px;">{{item.user_id}}</font></td>
                            <td><font class="d-block text-truncate" style="width:100px;">{{item.estimate_request_count}}</font></td>
                            <td><font class="d-block text-truncate" style="width:100px;">{{item.estimate_write_count}}</font></td>
                            <td><font class="d-block text-truncate" style="width:100px;">{{item.solution_count}}</font></td>
                            <td><font class="d-block text-truncate" style="width:200px;">{{item.email}}</font></td>
                            <td>
                                <v-select
                                    hide-details
                                    outlined
                                    dense
                                    :items="select_list.status"
                                    v-model="item.status"
                                    @change="update_status(item)"
                                ></v-select>
                            </td>
                            <td><font class="d-block text-truncate" style="width:200px;">{{new Date(item.created).toLocaleString()}}</font></td>
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
        headers: [
            {text: '', value: ''},
            {text: '유저 아이디', value: 'user_id'},
            {text: '견적요청 수', value: 'estimate_request_count'},
            {text: '견적서 작성 수', value: 'estimate_write_count'},
            {text: '제품/솔루션 수', value: 'solution_count'},
            {text: '이메일 주소', value: 'email'},
            {text: '이메일 인증', value: 'status'},
            {text: '가입일자', value: 'created'}
        ],

        list: [],

        select_list: {
            search_type: [
                "유저 아이디", 
                "이메일 주소",
            ],

            status: ["미인증", "인증완료"]
        },

        selected: false,
        selectedItem: {},

        search_type: "유저 아이디",
        keyword: ""
    }),

    mounted(){
        this.search()
    },

    methods: {
        // 검색
        search(){
            this.$http.post('/api/admin/user/select/search', {
                params: {
                    keyword: this.keyword,
                    type: this.search_type
                }
            }).then((res) => {
                this.list = res.data
            })
        },

        // 이메일 인증여부 변경하기
        update_status(item){
            this.$http.post('/api/admin/user/update/status', {
                params: {
                    status: item.status,
                    user_id: item.user_id
                }
            }).then((res) => {
                if(res.data.affectedRows){
                    alert("이메일 인증 상태가 변경되었습니다.")
                }
            })
        },

        // 삭제하기
        deleteItem(){
            if(!Object.keys(this.selectedItem).length){
                alert("선택한 사용자가 없습니다")
            }else{
                if(confirm("정말 해당 사용자를 삭제하겠습니까?")){
                    this.$http.post('/api/admin/user/delete', {
                        params: {
                            id: this.selectedItem.id
                        }
                    }).then((res) => {
                        if(res.data.affectedRows){
                            alert("해당 사용자를 삭제되었습니다.")
                            this.search()
                        }
                    })
                }
            }
        }
    }
}
</script>