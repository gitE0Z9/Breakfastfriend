<template lang="pug">
.admin
    .login_page(v-if="!administrator")
        b-card.panel(header="管理員系統",header-bg-variant="primary")
            b-form(@submit.prevent="adminin")
                b-form-group(label="帳號")
                    b-form-input(type="text", v-model="user")
                b-form-group(label="密碼")
                    b-form-input(type="password", v-model="pass")
                p.text-danger(v-show='error') {{"是管理員嗎？"}}
                b-button(variant="primary", type='submit') 登入
    .manage_page(v-if="administrator")
        b-navbar.long
            b-navbar-nav
                b-navbar-brand 管理系統
        .row
            .col-2
                .list-side
                    b-list-group
                        b-list-group-item(@click="pages='online'") 線上情況
                        b-list-group-item(@click="pages='worker'") 員工管理
                        b-list-group-item(@click="pages='member'") 會員資料
                        b-list-group-item(@click="pages='campaign'") 活動行程
                        b-list-group-item 登出
            .col-10.pl-5.pt-4
                .content
                    #online(v-if="pages=='online'")
                        b-container
                            h1 目前線上人數
                    #worker(v-if="pages=='worker'")
                        p work
                    #member(v-if="pages=='member'")
                        b-container
                            h3 搜尋會員
                            b-form-group(label="會員信箱：")
                                b-form-input(type="text", v-model="query", @change="mem_query")
                            p 結果
                            hr
                            p.text-danger(v-show="error") {{"會員不存在！"}}
                            .row(v-if="!error & result!=''")
                                .col-8
                                    p.d-inline
                                    | 會員名稱：
                                    | {{result.name}}
                                    b-badge(:variant="mem_state", pill) {{result.state}}
                                    p
                                    | Email：
                                    | {{result.email}}
                                    a(role="button") 發送驗證信
                                    p
                                    | 密碼：
                                    | {{result.password}}
                                    a(role="button") 修改密碼
                                    p
                                    | 註冊日期：
                                    | {{result.register_time}}
                                    p
                                    | 最近登入日期：
                                    | 
                                .col-4
                                    img.img-fluid.img-thumbnail(:src="result.pic")
                                b-card(header="配對歷史")
                                    b-table.bg-light(:items="[result]", striped, hover)
                    #campaign(v-if="pages=='campaign'")
                        p camp

</template>


<script>
import axios from 'axios'

    export default {
        data (){
            return {
                administrator: false,
                error: false,
                user: "",
                pass: "",
                pages:"online",
                query:"",
                result: ""
            }
        },
        computed: {
            mem_state(){
                switch(this.result.state){
                    case 'sleep':
                        return 'info'
                    case 'untested':
                        return 'primary'
                    case 'activate':
                        return 'success'
                }
            }
        },
        methods: {
            adminin(){
                axios.post('/api/admin/login',
                {account: this.user,
                 password: this.pass},{}
                ).then((res) => {
                    if(res.data.msg=="管理員核可成功"){
                        this.error=false
                        this.administrator=true
                        this.$cookies.set('admin',res.data.data,{
                            path: '/',
                            maxAge: 60 * 60
                        })
                    }
                    else if (res.data.msg=="是管理員嗎？"){
                        this.error=true
                    }
                }).catch(
                    (e) => {
                        console.log(e)
                    }
                )
            },
            mem_query(){
                axios.post('/api/admin/mem',
                {mail: this.query},{}
                ).then((res) => {
                    if(res.data.msg=="搜尋會員成功"){
                        this.error=false
                        this.result=res.data.data
                    }
                    else if (res.data.msg=="會員不存在！"){
                        this.error=true
                    }
                }).catch(
                    (e) => {
                        console.log(e)
                    }
                )               
            }
        },
        head(){
            return {
                title: "後台管理系統"
            }
        },
        beforeMount() {
            if (this.$cookies.get('admin')){
                this.administrator=true
            }   
        }
    }
</script>

<style lang='sass'>

// 

.login_page
    background: lightblue
    height: 100vh
    width: 100vw
    display: flex
    justify-content: center
    align-items: center

.panel
    min-width: 30vw

// 


// 

.long
    background: pink
    min-height: 55px

// 

// 

.list-side
    height: 100vh
    box-shadow: 1px 3px 5px
    background: white

// 


</style>
