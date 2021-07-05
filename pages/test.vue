<template lang='pug'>
.test_page
    b-navbar
        b-navbar-nav.ml-auto.bar
            span.button--pink {{this.$cookies.get('login').name}}
            logout.button--pink
    b-form.poll(@submit.prevent="check")
        .page_number {{page}}
        .p-4(v-show="page==1")
            p.text-center 請填寫基本資料讓我們了解您唷！
            b-form-group(label="您的性別")
                b-form-radio-group(v-model="sex", name="sex", :options="sexes" )
            b-form-group(label="您的出生年(西元)")
                b-form-input(v-model="year", type="text")
            b-form-group(label="您的戀愛性向")
                b-form-radio-group(v-model="toward", name="toward", :options="sexes" )
            b-form-group(label="您的產業")
                b-form-select(v-model="job", :options="jobs" )
            b-button(variant="primary", @click="page=2") 繼續
        .p-4(v-show="page==2")
            b-form-group(v-for="(qs,index) in problem_set_1", :key="qs.number", :label="qs.question")
                b-form-radio-group(v-model="result[index]", :name="qs.number", :options="poll" )  
            b-button(variant="primary", @click="page=1") 返回         
            b-button.ml-2(variant="primary", @click="page=3") 繼續
        .p-4(v-show="page==3")
            b-form-group(v-for="(qs,index) in problem_set_2", :key="qs.number", :label="qs.question")
                b-form-radio-group(v-model="result[index + problem_set_1.length]", :name="qs.number", :options="poll" )
            b-button(variant="primary", @click="page=2") 返回         
            b-button.ml-2(variant="primary", type="submit") 提交
</template>

<script>
import logout from '~/components/logout.vue'

import axios from 'axios'

    export default {
        data () {
            return {
                page: 1,
                sex: "",
                toward: "",
                sexes: [
                    { value: "Male", text: "男"},
                    { value: "Female", text: "女"}                    
                ],
                year: "",
                job: "",
                jobs: [
                    { value: "科技業", text: "科技業"},
                    { value: "金融業", text: "金融業"},
                    { value: "教育業", text: "教育業"},
                    { value: "自由業", text: "自由業"},
                    { value: "服務業", text: "服務業"},
                    { value: "醫療業", text: "醫療業"},
                    { value: "藍領", text: "藍領"},
                    { value: "農業", text: "農業"},
                    { value: "學生", text: "學生"},
                    { value: "公務員", text: "公務員"}
                ],
                problem_set_1: [
                    {question: "在工作上，我是有效率又能勝任的", number: "C"},
                    {question: "對我來說，獨立和自給自足的感覺是非常重要的", number: "D1"},
                    {question: "我不會擔心自己孤單一人", number: "D2"},
                    {question: "美感和藝術感對我來說十分重要", number: "O"},
                    {question: "我有時候會想要尋求冒險和刺激", number: "E"},
                    {question: "我對自己不滿意", number: "S1"},
                    {question: "我發現自己很容易和別人親近", number: "S2"}
                ],
                problem_set_2: [
                    {question: "朋友們都覺得我很可靠", number: "A"},
                    {question: "我時常太過於在乎別人對我的看法", number: "P1"},
                    {question: "我會擔心別人並不那麼想要跟我在一起", number: "P2"},
                    {question: "我容易感到緊張焦慮", number: "N"},
                    {question: "我想要情感上的親密關係，但卻很難完全信賴別人", number: "F1"},
                    {question: "當別人太親近我時，我會感覺不自在", number: "F2"}
                ],
                poll: [
                    {value: 1, text: "非常不符合"},
                    {value: 2, text: "不符合"},
                    {value: 3, text: "普通"},
                    {value: 4, text: "符合"},
                    {value: 5, text: "非常符合"}
                ]
                
            }
        },
        computed:{
            result(){
                return new Array(this.problem_set_1.length + this.problem_set_2.length).fill(0)
            }
        },
        methods: {
            check_base(){
                // 檢查基本資料
                if(this.sex== "" || this.toward== "" || this.year== "" || this.job== ""){
                    this.page = 1
                    this.$bvToast.toast(`基本資料未填完喔！`, {
                                        title: '提醒您',
                                        autoHideDelay: 5000,
                                        appendToast: true
                    })
                    return true
                }
                else{
                    return false
                } 
            },
            check_year(){
                //檢查年齡 
                if(parseInt(this.year) < 1900 || parseInt(this.year) > 2019){
                        this.page = 1
                        this.$bvToast.toast(`年齡不正確喔！`, {
                                        title: '提醒您',
                                        autoHideDelay: 5000,
                                        variant: "danger",
                                        appendToast: true
                        })
                        return true
                }
                else{
                        return false
                }
            },
            check(){
                console.log(this.sex,this.year,this.toward,this.job,this.result)
                if(this.check_base()){
                }
                else if(this.check_year()){
                }
                else{
                    for (let i = 0 ; i < this.result.length; i++){
                    //檢查問卷第一頁
                        if(this.result[i]==0 && i<this.problem_set_1.length){
                            this.$bvToast.toast(`問卷第二頁未填完喔！`, {
                                    title: '提醒您',
                                    autoHideDelay: 5000,
                                    variant: "warning",
                                    appendToast: true
                                })
                                this.page=2
                                break
                            }
                    //檢查問卷第二頁                 
                        else if (this.result[i]==0 && this.problem_set_1.length < i && i< this.result.length){
                                    this.$bvToast.toast(`問卷第三頁未填完喔！`, {
                                        title: '提醒您',
                                        autoHideDelay: 5000,
                                        variant: "warning",
                                        appendToast: true
                                    })
                                    this.page=3
                                    break
                            }
                        }
                    //結束
                    if(this.result.every(x => x !== 0)){
                        axios.post('/api/user/test',
                        { id:this.$cookies.get('login').id,
                        sex:this.sex,
                        year:this.year,
                        toward:this.toward,
                        job:this.job,
                        result:this.result},{}
                        ).then((res) => {
                            if(res.data.msg=="測驗完成"){
                                this.$cookies.get('login').state='activate'
                                location.href='pair'
                            }
                            else{
                                this.$bvToast.toast(`您是否已寫過心理測驗？`, {
                                        title: '測驗儲存失敗',
                                        autoHideDelay: 5000,
                                        variant: "danger",
                                        appendToast: true
                                })         
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                    }
                }
            }
        },
        components:{
            logout
        },
        head(){
            return {
                title: "心理測驗"
            }
        }
    }
</script>

<style lang='sass'>
@import "~/assets/test.sass"

</style>