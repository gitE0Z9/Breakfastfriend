<template lang='pug'>
section#partner
    h1 合作夥伴
    .row
      .col-12.col-md-5
        b-card.partner_intro(border-variant="light")
          b-card-title.text-center
            | NiHao(你好)
          b-card-sub-title.mb-3.text-center
            | Cafe and Hotel
          b-card-text
            | 「你好」
            | 是中文中最重要的歡迎及常見的招呼語，它開啟我們與世界各地旅人的溝通起點，是我們的品牌名稱。城市咖啡館結合設計旅店，充滿綠意的植物散布其中，
            | 更提供地道的當地美食和專業咖啡。
          b-card-text
            | "NiHao" is the most important welcome phrase in Mandarin;
            |  Welcome to NiHao Cafe Hotel! Situated in the prestiges Daan district, NiHao Café
            | Hotel combines the botanical living style with authentic local food ,and
            | specialized coffee provided by the on-site cafe.
          b-card.discount(header="好事成雙")
            b-card-text
              span
                i.fa.fa-star
                |  任一飲料搭配點心，折價30元
            b-card-text
              span
                i.fa.fa-star
                |  主餐加79可搭配任何一種飲料
      .col-12.col-md-7.partner_photo
        img.img-fluid(src="~static/nihao.jpg",alt="")
</template>