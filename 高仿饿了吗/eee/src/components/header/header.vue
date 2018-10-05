<template>
    <div id="head">
    	<div class="content-wrapper">
    		<div class="avatar">
    			<img width="64" height="64" :src="seller[0].seller.avatar">
    		</div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller[0].seller.name}}</span>
                </div>
                <div class="description">
                    {{seller[0].seller.description}}/{{seller[0].seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller[0].seller.supports[0]" class="support">
                    <span class="icon" :class="classMap[seller[0].seller.supports[0].type]"></span>
                    <span class="text">{{seller[0].seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller[0].seller.supports" @click="showdaril()" class="support-count">
                <span class="count">{{seller[0].seller.supports.length}}个</span>
                <i class="io iconfont icon-qianjin"></i>
            </div>
    	</div>
		<div class="bulletin-wrapper" @click="showdaril()">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller[0].seller.bulletin}}</span>
            <i class="it iconfont icon-qianjin"></i>    
        </div>
        <div class="background">
            <img :src="seller[0].seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
        <div v-show="detailShow" class="detail">
            <div class="detail-warpper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller[0].seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller[0].seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller[0].seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller[0].seller.supports">
                            <span class="icon" :class="classMap[seller[0].seller.supports[index].type]"></span>
                            <span class="text">{{seller[0].seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller[0].seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="iconfont icon-chahao"></i>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import star from "../star/star.vue"
export default {
    name:"thehead",
    props:{
        seller:{
            type:Object
        }
    },
    data (){
        return {
            detailShow:false
        }
    },
    methods:{
        showdaril (){
            this.detailShow=true
        },
        hideDetail (){
            this.detailShow=false
        }
    },
    created (){
        this.classMap=["decrease","discount","special","invoice","guarantee"]
    },
    components:{
        star:star
    }
}
</script>
<style scoped>
#head{
    color:white;
    position:relative;
    overflow:hidden;
    background-color:rgba(7,17,27,0.5);
}
.content-wrapper{
    padding:24px 12px 18px 24px;
    font-size:0;
    position:relative;
}
.avatar{
    display:inline-block;
}
img{
    border-radius:2px;
}
.content{
    margin-left:16px;
    display:inline-block;
    font-size:14px;
}
.title{
    margin:2px 0 8px 0;
}
.brand{
    display:inline-block;
    vertical-align:top;
    width:30px;
    height:18px;
    background-image:url("./brand@2x.png");
    background-size:30px 18px;
    background-repeat:no-repeat;
}
.name{
    margin-left:6px;
    font-size:16px;
    font-weight:blod;
    line-height:18px;
}
.description{
    margin-bottom:10px;
    line-height:12px;
    font-size:12px;
    font-weight:200;
}
.icon{
    display:inline-block;
    width:12px;
    height:12px;
    margin-right:4px;
    background-size:12px 12px;
    background-repeat:no-repeat;
}
.decrease{
    background-image:url("./decrease_1@2x.png")
}
.discount{
    background-image:url("./discount_1@2x.png")
}
.guarantee{
    background-image:url("./guarantee_1@2x.png")
}
.invoice{
    background-image:url("./invoice_1@2x.png")
}
.special{
    background-image:url("./special_1@2x.png")
}
.text{
    line-height:12px;
    font-size:10px;
    font-weight:200;
}
.support-count{
    position:absolute;
    right:12px;
    bottom:14px;
    padding:0 8px;
    height:24px;
    line-height:24px;
    border-radius:14px;
    background-color:rgba(0,0,0,0.2);
    text-align:center;
}
.count{
    font-size:10px;
    vertical-align:top;
}
.io{
    line-height:24px;
    margin-left:2px;
    font-size:10px;
}
.bulletin-wrapper{
    position:relative;
    height:28px;
    line-height:28px;
    padding:0 22px 0 12px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    background-color:rgba(7,17,27,0.2);
}
.bulletin-title{
    display:inline-block;
    vertical-align:top;
    margin-top:8px;
    width:22px;
    height:12px;
    background-image:url(./bulletin@2x.png);
    background-size:22px 12px;
    background-repeat:no-repeat;
}
.bulletin-text{
    vertical-align:top;
    margin:0 4px;
    font-size:10px;
    font-weight:200;
}
.it{
    position:absolute;
    font-size:10px;
    right:12px;
    top:1px;
}
.background{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-1;
    filter:blur(10px);
}
.detail{
    position:fixed;
    z-index:100;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow:auto;
    transition:all 0.5s;
    background-color:rgba(7,17,27,0.8);
    backdrop-filter:blur(10px);
}
.fade-enter-to,.fade-leave{
    opacity:1;
    background-color:rgba(7,17,27,0.8);
}
.fade-enter,.fade-leave-to{
    opacity:0;
    background-color:rgba(7,17,27,0);
}
.clearfix{
    display:inline-block;
}
.clearfix:after{
    display:block;
    content:".";
    height:0;
    line-height:0;
    clear:both;
    visibility:hidden;
}
.detail-warpper{
    min-height:100%;
    width:100%;
}
.detail-main{
    margin-top:64px;
    padding-bottom:64px;
}
.detail-close{
    position:relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
}
.detail .name{
    line-height:16px;
    text-align:center;
    font-size:16px;
    font-weight:700;
}
.star-wrapper{
    margin-top:18px;
    padding:2px 0;
    text-align:center;
}
.detail .title{
    display:flex;
    width:80%;
    margin:28px auto 24px auto;
}
.detail .line{
    flex:1;
    position:relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,0.2);
}
.detail .text{
    padding:0 12px;
    font-weight:700;
    font-size:14px;
}
.supports{
    width:80%;
    margin:0 auto;
}
.supports .support-item{
    padding:0 12px;
    margin-bottom:12px;
    font-size:0;
}
.supports .support-item:last-child{
    margin-bottom:0;
}
.supports .icon{
    display:inline-block;
    width:16px;
    height:16px;
    vertical-align:top;
    margin-right:6px;
    background-size:16px 16px;
    background-repeat:no-repeat;
}
.supports .decrease{
    background-image:url("./decrease_2@2x.png")
}
.supports .discount{
    background-image:url("./discount_2@2x.png")
}
.supports .guarantee{
    background-image:url("./guarantee_2@2x.png")
}
.supports .invoice{
    background-image:url("./invoice_2@2x.png")
}
.supports .special{
    background-image:url("./special_2@2x.png")
}
.supports .text{
    line-height:16px;
    font-weight:200;
    font-size:12px;
}
.bulletin{
    width:80%;
    margin:0 auto;
}
.bulletin .content{
    padding:0 12px;
    line-height:24px;
    font-size:12px;
}
</style>
