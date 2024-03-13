<template>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations(['logout']),
    },
    created () {
        this.logout()
        this.$router.push('/')
    }
}
</script>