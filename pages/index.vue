<template lang="pug">
.homepage
  sidebar(:drawer="drawer")
  section.banner#top
    .position-absolute.bar
      b-button.button--nav(v-if="!loginvalid",v-b-modal.login, variant="light") 
        span
          i.fa.fa-unlock-alt(v-if="!loginvalid") 登入
      b-button.button--nav(v-if="loginvalid", variant="light", to="pair") 
        span
          i.fa.fa-user(v-if="loginvalid") {{this.$cookies.get('login').name}}
      b-button.button--nav(v-if="!loginvalid", v-b-modal.register, variant="light")
        span
          i.fa.fa-pencil-square-o(v-if="!loginvalid") 註冊
      b-button.button--nav(v-if="loginvalid", variant="light", @click="logout()")
        span      
          i.fa.fa-sign-out(v-if="loginvalid") 登出
      a.drawer(@click="drawer = !drawer", role='button')
        i.fa.fa-gear.show_me
      login_panel
      register_panel
    h1.big_word.d-inline-block
      | Breakfast
      br
      | 一起吃早餐
    .godown
      a(v-scroll-to="'#intro'")
        button.rolldown
          i.fa.fa-chevron-down
  intro
  partner
  team 
</template>

<script>
import sidebar from '~/components/homepage/sidebar.vue'
import login_panel from '~/components/homepage/login.vue'
import register_panel from '~/components/homepage/register.vue'
import intro from '~/components/homepage/intro.vue'
import partner from '~/components/homepage/partner.vue'
import team from '~/components/homepage/team.vue'

export default {
  data () {
    return {
      drawer: false
    }
  },
  computed:{
    loginvalid(){
      return this.$cookies.get('login') ? true : false
    }
  },
  components:{
    sidebar,
    login_panel,
    register_panel,
    intro,
    partner,
    team,
  },
  methods:{
    logout(){
      this.$cookies.remove('login')
      location.href="/"
    }
  },
  head(){
    return {
      title: "吃早餐交朋友"
      }
  }
}
</script>

<style lang='sass'>
@import "~/assets/index.sass"

</style>
