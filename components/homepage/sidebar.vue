<template lang='pug'>

    transition(name="slide-fade")
        .list-side(v-show="drawer")
            ul.list-group
            li.list-group-item(v-for="item,index in items", :key="item.title" :class="{ 'mt-5': index==0 }")
                a(:href="item.link",v-scroll-to="item.link", role='button') {{item.title}}

</template>

<script>
export default {
    data (){
        return {
            items: [{link:"#top",title:"吃早餐交朋友"},
                {link:"#intro",title:"關於產品"},
                {link:"#partner",title:"合作夥伴"},
                {link:"#team",title:"我們團隊"},
                {link:"#connect",title:"聯絡我們"}]
        }
    },
    props:['drawer']
}
</script>