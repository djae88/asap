import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 사용자
        asap_user: {
            is_logined: false,
            user_id: "",
            email: "",
            profile_image: "",
            type: "",
            status: "",
            created: ""
        },

        // 관리자
        asap_admin: {
            is_logined: false
        }
    },

    getters: {

    },

    mutations: {
        // 사용자 로그인
        login: (state, payload) => {
            state.asap_user.is_logined = true
            state.asap_user.user_id = payload.user_id
            state.asap_user.email = payload.email
            state.asap_user.profile_image = payload.profile_image
            state.asap_user.type = payload.type
            state.asap_user.status = payload.status
            state.asap_user.created = payload.created
        },

        // 사용자 로그아웃
        logout: (state) => {
            state.asap_user.is_logined = false
            state.asap_user.user_id = ""
            state.asap_user.email = ""
            state.asap_user.profile_image = ""
            state.asap_user.type = ""
            state.asap_user.status = ""
            state.asap_user.created = ""
        },

        // 사용자 프로필 수정하기
        update_profile_image: (state, payload) => {
            state.asap_user.profile_image = payload
        },

        // 관리자 로그인
        admin_login: (state) => {
            state.asap_admin.is_logined = true
        },

        // 관리자 로그아웃
        admin_logout: (state) => {
            state.asap_admin.is_logined = false
        },
    },

    actions: {

    },

    modules: {

    },

    plugins: [
        createPersistedState({
            paths: [
                'asap_user',
                'asap_admin'
            ]
        })
    ]
})
