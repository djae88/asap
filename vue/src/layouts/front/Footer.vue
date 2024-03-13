<template>
    <v-sheet
        color="#efefef"
        class="pt-10 pb-6 text-center"
    >
        <!-- 로고 -->
        <v-sheet 
            width="220"
            class="d-flex justify-center mx-auto mb-4"
            color="transparent"
        >
            <v-img
                height="40"
                width="66"
                contain
                src="@/assets/logo/default.png"
            ></v-img>
        </v-sheet>

        <!-- SNS -->
        <v-sheet class="py-2" color="transparent">
            <v-icon
                color="#4267B2"
                class="mx-3"
                style="cursor:pointer"
            >
                mdi-facebook
            </v-icon>
            <v-icon
                color="#1DA1F2"
                class="mx-3"
                style="cursor:pointer"
            >
                mdi-twitter
            </v-icon>
            <v-icon
                class="instagram mx-3"
                style="cursor:pointer"
            >
                mdi-instagram
            </v-icon>
        </v-sheet>

        <!-- 약관 -->
        <v-sheet color="transparent" max-width="380" class="mx-auto pt-1 pb-3">
            <v-row class="text-center">
                <v-col cols="12" sm="4">
                    <v-btn
                        to="/policy/privacy?type=read"
                        :small="!$vuetify.breakpoint.mdAndUp"
                        width="100"
                        text
                        v-ripple="false"
                        class="grey--text text--darken-1"
                    >
                        개인정보처리방침
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-btn
                        to="/policy/rule?type=read"
                        :small="!$vuetify.breakpoint.mdAndUp"
                        width="100"
                        text
                        v-ripple="false"
                        class="grey--text text--darken-1"
                    >
                        이용약관
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-btn
                        to="/policy/emaildeny?type=read"
                        :small="!$vuetify.breakpoint.mdAndUp"
                        width="100"
                        text
                        v-ripple="false"
                        class="grey--text text--darken-1"
                    >
                        이메일무단수집거부
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>

        <!-- ALL Rights -->
        <p 
            class="my-0 grey--text"
            :class="$vuetify.breakpoint.mdAndUp? '':'text-caption'"
        >
            COPYRIGHT © Asap, LTD. All Rights Reserved.
        </p>

        <p 
            class="mt-2 mx-5 mb-1 grey--text text-caption"
        >
            ASAP | 대표 :  | 대표번호 : 0000-0000
            사업자등록번호 : 000-00-00000 | 주소 : 사업장 주소
        </p>
    </v-sheet>
</template>
<style scoped>
.v-btn::before {
  background-color: transparent;
}

.v-btn:hover {
    color:#2196F3 !important;
}
</style>
<style>
.mdi-instagram {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>