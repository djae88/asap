<template>
    <div>
        <v-dialog
            v-model="dialog.index"
            :width="$vuetify.breakpoint.mdAndUp? 500 : '100%'"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :width="$vuetify.breakpoint.mdAndUp? 200 : '100%'"
                    :small="!$vuetify.breakpoint.mdAndUp"
                    outlined
                    color="orange"
                    v-bind="attrs"
                    v-on="on"
                >
                    출발지 추가하기
                </v-btn>
            </template>
            <v-card class="pa-4">
                <p class="text-h6 text-center mb-3">출발지 추가</p>
                <v-divider class="mb-4"></v-divider>
                <v-simple-table id="address_add">
                    <tr>
                        <td>
                            <v-text-field
                                color="orange"
                                outlined 
                                dense 
                                hide-details
                                placeholder="보내실 분"
                                v-model="sender"
                            ></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <v-sheet class="d-flex">
                                <v-text-field
                                    color="orange" 
                                    outlined 
                                    dense 
                                    hide-details
                                    placeholder="전화번호"
                                    v-model="phone1"
                                    type="number"
                                ></v-text-field>
                                <v-icon x-small class="mx-2">mdi-window-minimize</v-icon>
                                <v-text-field
                                    color="orange" 
                                    outlined 
                                    dense 
                                    hide-details
                                    v-model="phone2"
                                    type="number"
                                ></v-text-field>
                                <v-icon x-small class="mx-2">mdi-window-minimize</v-icon>
                                <v-text-field
                                    color="orange" 
                                    outlined 
                                    dense 
                                    hide-details
                                    v-model="phone3"
                                    type="number"
                                ></v-text-field>
                            </v-sheet>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <v-text-field
                                color="orange" 
                                outlined 
                                dense 
                                hide-details
                                readonly
                                placeholder="우편 번호"
                                v-model="zip"
                            ></v-text-field>
                        </td> 
                        <td>
                            <v-btn block depressed style="border:1px solid #ccc;" @click="showApi">
                                주소검색
                            </v-btn>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <v-text-field
                                color="orange" 
                                outlined 
                                dense 
                                hide-details
                                readonly
                                placeholder="기본 주소"
                                v-model="addr1"
                            ></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <v-text-field
                                color="orange" 
                                outlined 
                                dense 
                                hide-details
                                placeholder="상세 주소"
                                v-model="addr2"
                            ></v-text-field>
                        </td>
                    </tr>
                </v-simple-table>
                <v-divider class="my-2 mb-5"></v-divider>

                <v-btn
                    block
                    class=""
                    color="orange"
                    depressed
                    dark
                    large
                    @click="submit()"
                >
                    출발지 추가하기
                </v-btn>
            </v-card>
        </v-dialog>

        <!-- 서비스 지역이 아님 -->
        <v-dialog v-model="dialog.sorry" width="420" content-class="rounded-15">
            <v-sheet class="pt-16 px-10 pb-6">
                <!-- 이미지 -->
                <v-img src="@/assets/home/check/sorry.png" width="120" class="mx-auto mb-4"></v-img>

                <!-- 안내문구 1 -->
                <p class="text-center font-weight-medium mb-3">
                    해당 지역은 현재 아쉽게도<br/>
                    아직 서비스 가능 지역이 아닙니다.
                </p>

                <!-- 안내문구 2 -->
                <p class="text-center text-caption orange--text text--darken-1 mb-6">
                    현재 URBANGX는 서울만을 서비스중에 있으며,<br/>
                    점차 서비스 지역을 확대할 예정입니다.
                </p>

                <!-- 닫기 -->
                <v-btn
                    block
                    dark
                    depressed
                    color="grey lighten-1"
                    class="rounded-lg"
                    @click="dialog.sorry = false"
                >
                    닫기
                </v-btn>
            </v-sheet>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data: () => ({
        dialog: {
            index: false,
            sorry: false
        },

        zip: '', 
        addr1: '', 
        addr2: '',
        address: "",
        sender: "",
        phone1: "",
        phone2: "",
        phone3: "",
        phone: ""
    }),

    methods: {
        showApi() { 
            new window.daum.Postcode({ 
                oncomplete: (data) => { 
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분. 
                    // 도로명 주소의 노출 규칙에 따라 주소를 조합한다. 
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다. 
                    let fullRoadAddr = data.roadAddress
                    // 도로명 주소 변수 
                    let extraRoadAddr = ''
                    // 도로명 조합형 주소 변수 
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외) 
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다. 
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){ extraRoadAddr += data.bname} 
                    // 건물명이 있고, 공동주택일 경우 추가한다. 
                    if(data.buildingName !== '' && data.apartment === 'Y'){ extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName)} 
                    // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다. 
                    if(extraRoadAddr !== ''){ extraRoadAddr = ' (' + extraRoadAddr + ')'} 
                    // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다. 
                    if(fullRoadAddr !== ''){ fullRoadAddr += extraRoadAddr} 
                    // 우편번호와 주소 정보를 해당 필드에 넣는다. 
                    this.zip = data.zonecode
                    //5자리 새우편번호 사용 
                    this.addr1 = fullRoadAddr

                    if(
                        !(this.addr1.startsWith("서울"))
                    ){
                        this.dialog.sorry = true
                        this.zip = ""
                        this.addr1 = ""
                    }
                }
            }).open()
        },

        submit(){
            this.phone = this.phone1 + "-" + this.phone2 + "-" + this.phone3

            if(!this.sender){
                alert("보내실 분을 입력해주세요")
            }else if(this.phone1 + this.phone2 + this.phone3 == ""){
                alert("전화번호를 입력해주세요")
            }else if(!this.zip){
                alert("주소를 검색하여 입력해주세요")
            }else{
                // 전체 주소
                if(this.addr2 == ""){
                    this.address = "("+this.zip+") " + this.addr1
                }else{
                    this.address = "("+this.zip+") " + this.addr1 + " " + this.addr2
                }

                // 출발지 입력하기
                this.$http.post('/api/mypage/startAddress/insert', {
                    params: {
                        user_id: this.$store.state.urbangx_user.user_id,
                        sender: this.sender,
                        phone: this.phone,
                        zip: this.zip,
                        addr1: this.addr1,
                        addr2: this.addr2,
                        address: this.address,
                    }
                }).then((res) => {
                    if(!res.data.affectedRows){
                        alert("출발지 입력도중 오류가 발생하였습니다.")
                    }else{
                        // 입력창 초기화
                        this.zip=""
                        this.addr1=""
                        this.addr2=""
                        this.address=""

                        // alert
                        alert("출발지가 추가되었습니다.")

                        // reload
                        this.$emit("reload")

                        // 닫기
                        this.dialog.index = false
                    }
                })
            }
        }
    }
}
</script>
<style>
#address_add tr td{
    padding:5px;
}
</style>