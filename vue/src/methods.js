import alert from '@/methods/alert.js'
import commas from '@/methods/commas.js'
import links from '@/methods/links.js'

export default {
    install (Vue) {
        // 얼럿 관련 Methods
        Vue.prototype.$buttonAlert = alert.buttonAlert

        // 콤마 관련 Methods
        Vue.prototype.$inputToComma = commas.inputToComma
        Vue.prototype.$toComma = commas.toComma
        Vue.prototype.$toUnComma = commas.toUnComma

        // 링크 처리 관련 Methods
        Vue.prototype.$linkify = links.linkify
    }
}