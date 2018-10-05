<template>
    <div class="seller" ref="seller">
    	<div class="seller-content">
    		<div class="overview">
    			<div class="title">{{seller[0].seller.name}}</div>
    			<div class="desc">
    				<star :size="36" :score="seller[0].seller.score"></star>
    				<span class="text">({{seller[0].seller.ratingCount}})</span>
    				<span class="text">月售{{seller[0].seller.sellCount}}单</span>
    			</div>
    			<ul class="remark">
    				<li class="block">
    					<h2>起送价</h2>
    					<div class="content">
    						<span class="stress">{{seller[0].seller.minPrice}}元</span>
    					</div>
    				</li>
    				<li class="block">
    					<h2>商家配送</h2>
    					<div class="content">
    						<span class="stress">{{seller[0].seller.deliveryPrice}}</span>
    					</div>
    				</li>
    				<li class="block">
    					<h2>平均配送时长</h2>
    					<div class="content">
    						<span class="stress">{{seller[0].seller.deliveryTime}}分钟</span>
    					</div>
    				</li>
    			</ul>
    			<div class="favorite" @click="toggleFavorite">
    				<span class="iconfont icon-xihuan" :class="{'active':favorite}"></span>
    				<span class="text">{{favoriteText}}</span>
    			</div>
    		</div>
    		<split></split>
    		<div class="bulletin">
    			<h1 class="title">公告与活动</h1>
    			<div class="content-wrapper">
    				<p class="content">{{seller[0].seller.bulletin}}</p>
    			</div>
    			<ul v-if="seller[0].seller.supports" class="supports">
                    <li class="support-item" v-for="(item,index) in seller[0].seller.supports">
                        <span class="icon" :class="classMap[seller[0].seller.supports[index].type]"></span>
                        <span class="text">{{seller[0].seller.supports[index].description}}</span>
                    </li>
                </ul>
    		</div>
    		<split></split>
    		<div class="pics">
    			<h1 class="title">商家实景</h1>
    			<div class="pic-wrapper" ref="picscroll">
    				<ul class="pic-list" ref="picliss">
    					<li class="pic-item" v-for="pic in seller[0].seller.pics">
    						<img :src="pic" width="120" height="90">
    					</li>
    				</ul>
    			</div>
    		</div>
    		<split></split>
    		<div class="info">
    			<h1 class="title">商家信息</h1>
    			<ul>
    				<li class="info-item" v-for="info in seller[0].seller.infos">{{info}}</li>
    			</ul>
    		</div>
    	</div>
    </div>
</template>
<script>
import star from "../star/star"
import split from "../split/split"
import BScroll from "better-scroll"//该组件依赖dom,所以初始化一定放在dom生成后执行

export default {
    name:"seller",
    props:{
    	seller:{
    		type:Object
    	}
    },
    data(){
    	return{
    		favorite:false
    	}
    },
    methods:{
    	toggleFavorite(){
    		this.favorite=!this.favorite
    	}
    },
    computed:{
    	favoriteText(){
    		return this.favorite?"已收藏":"未收藏"
    	}
    },
    created(){
    	this.classMap=["decrease","discount","special","invoice","guarantee"]
    	this.$nextTick(()=>{
    			if(!this.scroll){
    				this.scroll=new BScroll(this.$refs.seller,{
    	 				click:true
    	 		})
    			}
    		})
    	this.$nextTick(()=>{
    		if(this.seller[0].seller.pics){
    				let picwidth=120;
    				let margin=6;
    				let width=(picwidth+margin)*this.seller[0].seller.pics.length-margin
    				this.$refs.picliss.style.width=width+"px"
    				this.picscroll=new BScroll(this.$refs.picscroll,{
    					scrollX: true,
				        scrollY: false,
				        momentum: false,
				        click:true,
    					eventPassthrough:"vertical"
    				})   
    			}
    	})
    },
    // watch:{//监听属性，当被监听当属性发生变化时触发里面的事件
    // 	"seller"(){
    // 		console.log(this.$refs.seller)
    // 		if(!this.scroll){
    // 			this.scroll=new BScroll(this.$refs.seller,{
    // 		 	click:true
    // 		})
    // 		}
    // 	}
    //},
    updated(){//因为seller是异步获取的，所以在ready时还没有seller，而该页面是靠seller数据撑开的，所以内部目前高度为0，所以用不了betterscroll
    		this.$nextTick(()=>{
    			if(!this.scroll){
    				this.scroll=new BScroll(this.$refs.seller,{
    	 				click:true
    	 		})
    			}
    		})
    		if(this.seller[0].seller.pics){
    				let picwidth=120;
    				let margin=6;
    				let width=(picwidth+margin)*this.seller[0].seller.pics.length-margin
    				this.$refs.picliss.style.width=width+"px"
    				this.picscroll=new BScroll(this.$refs.picscroll,{
    					scrollX: true,
				        scrollY: false,
				        momentum: false,
				        click:true,
    					eventPassthrough:"vertical"
    				})   
    			}
      
    },//ready方法虚拟dom已经渲染完毕，可以放心使用dom，而betterscroll插件以来虚拟dom，所以在这里放在ready生命周期函数中
    components:{
    	star,
    	split
    }
}
</script>
<style scoped>
*{
	margin:0;
	padding:0;
	list-style:none;
}
.seller{
	position:absolute;
	top:174px;
	bottom:0;
	left:0;
	width:100%;
	overflow:hidden;
}
.overview{
	position:relative;
	padding:18px;
}
.title{
	margin-bottom:8px;
	line-height:14px;
	color:rgb(7,17,27);
	font-size:14px;
}
.desc{
	padding-bottom:18px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	font-size:0;
}
.star{
	display:inline-block;
	vertical-align:top;
	margin-right:8px;
}
.text{
	margin-right:12px;
	line-height:18px;
	display:inline-block;
	vertical-align:top;
	font-size:10px;
	color:rgb(77,85,93);
}
.remark{
	display:flex;
	padding-top:18px;
}
.favorite{
	text-align:center;
	position:absolute;
	right:11px;
	top:18px;
	width:50px;
}
.favorite .icon-xihuan{
	display:block;
	margin-bottom:4px;
	line-height:24px;
	font-size:24px;
	color:#d4d6d9;
}
.favorite .active{
	color:rgb(240,20,20);
}
.favorite .text{
	display:inline-block;
	width:100%;
	text-align:center;
	line-height:10px;
	font-size:14px;
	color:rgb(77,85,93);
}
.block{
	flex:1;
	text-align:center;
	border-right:1px solid rgba(7,17,27,0.1);
}
.block:last-child{
	border:none;
}
h2{
	margin-bottom:4px;
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);
}
.content{
	line-height:24px;
	color:rgb(7,17,27);
}
.stress{
	font-size:24px;
	font-weight:200;
	line-height:24px;
}
.bulletin{
	padding:18px 18px 0 18px;
}
.bulletin .title{
	margin-bottom:8px;
	line-height:14px;
	color:rgb(7,17,27);
	font-size:14px;
}
.bulletin .content-wrapper{
	padding:0 12px 16px 12px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.bulletin .content{
	line-height:24px;
	font-size:12px;
	color:rgb(240,20,20);
}
.support-item{
	padding:16px 12px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	font-size:0;
}
.support-item:last-child{
	border:none;
}
.supports .icon{
    display:inline-block;
    width:12px;
    height:12px;
    margin-right:4px;
    background-size:12px 12px;
    background-repeat:no-repeat;
}
.decrease{
    background-image:url("./decrease_4@2x.png");
}
.discount{
    background-image:url("./discount_4@2x.png");
}
.guarantee{
    background-image:url("./guarantee_4@2x.png");
}
.invoice{
    background-image:url("./invoice_4@2x.png");
}
.special{
    background-image:url("./special_4@2x.png");
}
.supports .text{
	line-height:16px;
	font-size:12px;
	color:rgb(7,17,27);
}
.pics{
	padding:18px;
}
.pics .title{
	margin-bottom:12px;
	line-height:14px;
	color:rgb(7,17,27);
	font-size:14px;
}
.pics .pic-wrapper{
	width:100%;
	overflow:hidden;
	white-space:nowrap;
}
.pics .pic-list{
	font-size:0;
}
.pics .pic-item{
	display:inline-block;
	margin-right:6px;
	width:120px;
	height:90px;
}
.pics .pic-item:last-child{
	margin-right:0;
}
.info{
	padding:18px 18px 0 18px;
	color:rgb(7,17,27);
}
.info .title{
	padding-bottom:12px;
	line-height:14px;
	font-size:14px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.info .info-item{
	padding:16px 12px;
	line-height:16px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	font-size:12px;
}
.info .info-item:last-child{
	border:none;
}

</style>