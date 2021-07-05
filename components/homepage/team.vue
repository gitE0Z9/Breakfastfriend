<template lang='pug'>
section#team
    .mb-5
        h1 我們團隊
        .d-flex.justify-content-md-around.flex-column.flex-md-row
            div(v-for="index in 5" :key="index" :class=" 'member-' + index ")
    #connect
        h1 聯絡我們
        .d-flex.ml-5.justify-content-md-around.flex-column.flex-md-row
            .info-1
                p 客服專線
                p 0952-003-781
            .info-2
                p 信箱
                p info@ntc.im
            .info-3
                p 地址
                p 10684台北市大安區信義路四段1號3樓
            .info-4
                p 聯絡時間
                p 一 - 五 : 9:00 am to 5:00 pm        
</template>