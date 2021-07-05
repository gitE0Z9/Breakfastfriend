<template lang='pug'>
    b-modal(id="login", hide-footer)
        i.fa.fa-envelope-o.back_icon
        h1.form 登入
        p.d-inline 沒有帳號嗎?
        b-button(variant="link", v-b-modal.register) 現在註冊
        b-form.mt-3(@submit.prevent="login")
            b-form-group
                b-form-input.data(type="email", placeholder="信箱", v-model="email", required)
            b-form-group
                b-form-input.data(type="password", placeholder="密碼", v-model="password", required)
            p.text-danger(v-if="error") 信箱或密碼錯誤
            b-button.submit(type="submit") 登入
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            error: false,
            email: "",
            password: ""
        }
    },
    methods:{
        login(){
            axios.post('/api/user/login',
                { email:this.email,
                  password:this.password},{}
            ).then((result) => {
                if(result.data.msg=="登入成功"){
                    this.error=false;
                    this.$cookies.set('login', result.data.data, {
                        path: '/',
                        maxAge: 60 * 60 * 24
                    });
                    this.$cookies.set('token',this.email,{
                        path: '/',
                        maxAge: 60 * 60 * 3
                    })
                    switch(result.data.data.state){
                        case 'sleep':
                            location.href='email';
                            break;
                        case 'untested':
                            location.href='test';
                            break;
                        case 'activate':
                            location.href='pair';
                            break;
                        default:
                            console.log('wrong user state! Contact the team')
                    }
                }
                else if(result.data.msg=="登入失敗"){
                    this.error=true
                }
            }).catch((err) => {
                console.log(err)
                });
        }
    }
}
</script>