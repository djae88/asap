import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { routes } from './routes.js'
import store from './store.js'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import lodash from 'lodash'
import '@babel/polyfill'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueMoment from 'vue-moment'

// 링크 복사 ($copytext)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueRx from 'vue-rx'
import VuejsClipper from 'vuejs-clipper/dist/vuejs-clipper.umd.min'
import 'vuejs-clipper/dist/vuejs-clipper.css'
Vue.use(VueRx)
Vue.use(VuejsClipper)

import CustomMethods from './methods'
Vue.use(CustomMethods)

Vue.use(VueMoment)
Vue.use(Router)
Vue.use(
    Chartkick.use(Chart)
)

Vue.config.productionTip = false
Vue.prototype.$http = axios

export const eventBus = new Vue()

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

new Vue({
    router,
    store,
    vuetify,
    lodash,
    render: h => h(App)
}).$mount('#app')