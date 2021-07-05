<template lang="pug">
.wait_page
    .mail
    p 驗證信已寄發，請前往信箱確認喔!
    p.d-inline 沒有收到?
    a(href="#") 再次寄發

</template>


<script>
import axios from 'axios'

export default {
    data (){
        return {

        }
    },
    head(){
        return {
            title: "吃早餐交朋友"
        }
    },
    beforeMount() {
        if(this.$route.query.token==this.$cookies.get('token')){
            axios.put('/api/user/verify',
            {id:this.$cookies.get('login').id},{}
            ).then(
                () => {
                    this.$cookies.get('login').state='untested'
                    location.href='test'
                }
            ).catch((err) => {
                console.log(err)
                });
        }
    },  
}
</script>

<style lang='sass'>
@import "~assets/rwd.sass"

.wait_page
  position: fixed
  top: 45%
  left: 50%
  min-width: 300px
  transform: translate(-50%, -50%)
  text-align: center

.mail
    background: url("~static/mail.png") center
    background-size: cover
    height: 30vh
    min-width: 80%
    @include phone-width
        height: 70vh
</style>
