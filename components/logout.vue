<template lang='pug'>
    b-button(@click="logout()")
        span
            i.fa.fa-sign-out 登出
</template>

<script>
export default {
    methods:{
        logout(){
            this.$cookies.remove('login')
            location.href='/'
        }
    }
}
</script>