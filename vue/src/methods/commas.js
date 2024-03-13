const methods = {
    // 입력칸 콤마
    inputToComma(value) {
        return value = this.$toComma(this.$toUnComma(value))
    },

    // 콤마 추가
    toComma(value) {
        return value.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    },

    // 콤마 제거
    toUnComma(value) {
        return value.toString().replace(/[^\d]+/g, '')
    }
}

export default methods