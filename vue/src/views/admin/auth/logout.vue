<template>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations(['admin_logout']),
    },
    created () {
        this.admin_logout()
        this.$router.push('/admin/auth/login')
    }
}
</script>