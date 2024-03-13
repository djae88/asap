<template>
    <v-sheet
        class="py-4 d-flex align-center"
        style="border-bottom:1px solid #ddd"
    >
        <!-- 메뉴 -->
        <v-btn text fab small class="ml-4">
            <v-icon>mdi-menu</v-icon>
        </v-btn>

        <!-- 검색 -->
        <v-sheet width="280" class="ml-4">
            <v-text-field
                dense
                outlined
                hide-details
                rounded
                style="background:#f1f5f8"
                placeholder="검색"
                append-icon="mdi-magnify"
            ></v-text-field>
        </v-sheet>
        <v-spacer></v-spacer>

        <!-- 알림 -->
        <v-badge
            offset-x="20"
            offset-y="16"
            content="6"
            color="#6cb49c"
        >

            <v-btn class="mx-2" fab small outlined color="#ccc">
                <v-icon small color="#313942">mdi-bell</v-icon>
            </v-btn>
        </v-badge>

        <!-- 목록 알림 -->
        <v-badge
            offset-x="20"
            offset-y="16"
            content="2"
            color="#41abd2"
        >
            <v-btn class="mx-2" fab small outlined color="#ccc">
                <v-icon small color="#313942">mdi-format-list-bulleted</v-icon>
            </v-btn>
        </v-badge>
    </v-sheet>
</template>