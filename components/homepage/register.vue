<template lang='pug'>
      b-modal(id="register", hide-footer)
        i.fa.fa-envelope-o.back_icon
        h1.form 註冊
        b-form.mt-3(@submit.prevent="register")
          b-form-group
            b-form-input.data(type="text", placeholder="姓名", v-model="username", required)
          b-form-group        
            b-form-input.data(type="email", placeholder="信箱", v-model="email", :state="error" required)
            b-form-invalid-feedback(:state="error") 信箱已被註冊
          b-form-group
            b-form-input.data(type="password", placeholder="密碼", v-model="password", required)
          b-form-group
            b-form-input.data(type="password", placeholder="密碼確認", v-model="reconfirm", :state="passvalid" required)
            b-form-invalid-feedback(:state="passvalid") 密碼不符
            b-form-valid-feedback(:state="passvalid") 密碼相同
          b-button.submit(type="submit") 註冊
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            error: "",
            username: "",
            email: "",
            password: "",
            reconfirm: ""
        }
    },
    computed:{
        passvalid(){
            if (this.password != ""){
                return this.password == this.reconfirm;
            }
        }
    },
    methods:{
        async register(){
            await axios.post('/api/user/register',
            { name:this.username,
                email:this.email,
                password:this.password},{}
            ).then((result) => {
                if(result.data.msg=="註冊成功"){
                    this.$cookies.set('token',this.email,{
                        path: '/',
                        maxAge: 60 * 60 * 3
                    })
                    location.href='email'
                }
                else{
                    this.error=false         
                }
            }).catch((err) => {
                console.log(err)
            });
        },
    }
}
</script>
