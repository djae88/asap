<template>
    <v-app>
        <router-view :key="$route.fullPath"></router-view>
    </v-app>
</template>
<script>
export default {
    name: 'App'
}
</script>
<style>
.no_drag{
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
</style>