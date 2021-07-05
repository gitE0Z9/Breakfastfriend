<template lang='pug'>
.pair_app
    b-navbar.text-white.mb-5
        b-navbar-nav
            b-navbar-brand.text-white {{this.$cookies.get('login').name}}
            b-navbar-brand.text-white 
                i.fal.fa-coins 100
        b-navbar-nav.ml-auto
            b-button.button--log(@click="pages='pairing'") 配對結果
            b-button.button--log(@click="pages='invitation'") 邀請選單
            b-button.button--log(@click="pages='history'") 歷史紀錄
            logout_button.button--log
    #app.container
        #pairing_page(v-show="pages=='pairing'")
            b-card-group(deck)
                b-card(title="name",
                        img-src="https://picsum.photos/600/300/?image=25",
                        img-alt="Image",
                        img-top,
                        tag="article")
                    b-card-text
                    b-form-group(label="時間")
                        b-form-input
                    b-form-group(label="地點")
                        b-form-select(:options="place")
                    .d-flex.justify-content-center                    
                        b-button 邀約
                b-card(title="name",
                        img-src="https://picsum.photos/600/300/?image=25",
                        img-alt="Image",
                        img-top,
                        tag="article")
                    b-card-text
                    b-form-group(label="時間")
                        b-form-input
                    b-form-group(label="地點")
                        b-form-select(:options="place")
                    .d-flex.justify-content-center
                        b-button 邀約
        #invitation_page(v-show="pages=='invitation'")
            b-card-group(deck)
                b-card(title="name",
                            img-src="https://picsum.photos/600/300/?image=25",
                            img-alt="Image",
                            img-top,
                            tag="article",
                            v-for="index in 5")
                    b-card-text
                        p
                        | 時間：
                        |
                        p
                        | 地點：
                        | 
                    .d-flex.justify-content-center
                        b-button(variant="primary") 好啊
                        b-button.ml-auto(variant="danger") 掰掰
        #history_page(v-show="pages=='history'")
            b-table.bg-light(:items="past", striped, hover)
</template>

<script>
import logout_button from '~/components/logout.vue'

    export default {
        data () {
            return {
                pages:"pairing",
                past:[
                    {"name":"小名","year":"23","job":"餐飲業"}
                    ],
                place:[
                    {"value":"你好咖啡旅館","text":"你好咖啡旅館"}
                ]
            }
        },
        computed: {
            loginvalid(){
                return this.$cookies.get('login') ? true : false
                }
        },
        components: {
            logout_button
        },
        head(){
            return {
                title: "交友app"
            }
        },
        beforeMount() {
                switch(this.$cookies.get('login').state){
                    case 'sleep':
                        location.href='email';
                        break;
                    case 'untested':
                        location.href='test';
                        break;
                    default:
                        console.log('wrong user state! Contact the team')
                }
            }
    }
</script>

<style lang='sass'>
body
    background: powderblue

.button--log
  display: inline-block
  background: transparent
  border-radius: 4px
  border: 1px solid transparent
  color: white
  text-decoration: none
  padding: 0px 10px
  margin: 0px 10px
  &:hover
    color: #fff
    background-color: powderblue
    border: 1px solid transparent
    text-decoration: none


</style>
