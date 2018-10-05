<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
        	<div class="overview">
        		<div class="overview-left">
        			<h1 class="score">{{seller[0].seller.score}}</h1>
        			<div class="title">综合评分</div>
        			<div class="rank">高于周边商家{{seller[0].seller.rankRate}}%</div>
        		</div>
        		<div class="overview-right">
        			<div class="score-wrapper">
        				<span class="title">服务态度</span>
        				<star :size="36" :score="seller[0].seller.serviceScore"></star>
        				<span class="score">{{seller[0].seller.serviceScore}}</span>
        			</div>
        			<div class="score-wrapper">
        				<span class="title">商品评分</span>
        				<star :size="36" :score="seller[0].seller.foodScore"></star>
        				<span class="score">{{seller[0].seller.foodScore}}</span>
        			</div>
        			<div class="delivery-wrapper">
        				<span class="title">送达时间</span>
        				<span class="delivery">{{seller[0].seller.deliveryTime}}分钟</span>
        			</div>
        		</div>
        	</div>
        	<split></split>
        	<ratingselect @rtss="lp" @rts="rtss" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
        	<div class="rating-wrapper">
        		<ul>
        			<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
        				<div class="avatar">
        					<img width="28" height="28" :src="rating.avatar">
        				</div>
        				<div class="content">
        					<h1 class="name">{{rating.username}}</h1>
        					<div class="star-wrapper">
        						<star :size="24" :score="rating.score"></star>
        						<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>

        					</div>
        					<p class="text">{{rating.text}}</p>
        					<div class="recommend" v-show="rating.recommend.length">
        						<span class="iconfont icon-dianzan2-copy"></span>
        						<span class="item" v-for="item in rating.recommend">{{item}}</span>
        					</div>
        					<div class="time">
        						{{rating.rateTime | formatDate}}
        					</div>
        				</div>
        			</li>
        		</ul>
        	</div>
        </div>
    </div>
</template>
<script>
import star from "../star/star"
import split from "../split/split.vue"
import ratingselect from "../ratingselect/ratingselect.vue"
import {formatDate} from "./date.js"
import BScroll from "better-scroll"

const All=2

export default {
    name:"ratings",
    props:{
    	seller:{
    		type:Object
    	}
    },
    filters:{//filter是过滤,在这里写一个filters,来专门存放过滤用的函数
		formatDate(time){
			let date=new Date(time)//将该数据转换成一个date类型的对象
			return formatDate(date,"yyyy-MM-tt hh:mm")//用该方法去进行字符串格式的改变,通用方法可以写进common中,需要的时候引用就行
		}
	},
    data(){//按钮控制显示只需改变数据中的类型,在组件中已经利用过滤将数据的分类显示做好了
    	return {
    		x:{},
    		ratings:[],
    		selectType:All,
    		onlyContent:true,
    		desc:{
    			all:"全部",
    			positive:"满意",
    			negative:"不满意"
    		}
    	}
    },
    methods:{
    	rtss(type){
			this.selectType=type
			console.log(this.selectType)
		},
		lp(j){
			this.onlyContent=j
			console.log(this.onlyContent)
		},
		needShow(type,text){
			if(this.onlyContent && !text){
				return false
			}
			if(this.selectType===All){
				return true
			}else{
				return type===this.selectType
			}
		},
		show(){
			selectType:All
			onlyContent:true
		},
    },
    created(){
    	this.$ajax({
    		method:"post",
    		url:"http://localhost:3000/shuju"
    	})
    	.then((response)=>{
		      this.x=response.data
		      this.ratings=this.x[0].ratings
		      console.log(this.ratings)
		      this.$nextTick(()=>{
		      	this.scroll=new BScroll(this.$refs.ratings,{
		      	click:true
		      })
		      })
		    })
    	.catch((error)=>{
    		console.log(error)
    	})
    },
    components:{
    	star,
    	split,
    	ratingselect
    }
}
</script>
<style scoped>
*{
	margin:0;
	padding:0;
}
.ratings{
	position:absolute;
	top:174px;
	bottom:0;
	left:0;
	width:100%;
	overflow:hidden;
}
.overview{
	display:flex;
	padding:18px 0;
}
.overview-left{
	flex:0 0 137px;
	padding:6px 0;
	width:137px;
	border-right:1px solid rgba(7,17,27,0.1);
	text-align:center;
}
.overview-left .score{
	margin-top:0;
	margin-bottom:6px;
	line-height:30px;
	font-size:24px;
	color:rgb(255,153,0);
}
.overview-left .title{
	margin-bottom:8px;
	line-height:12px;
	font-size:12px;
	color:rgb(7,17,27);
}
.overview-left .rank{
	line-height:13px;
	font-size:10px;
	color:rgb(147,153,159);
}
.overview-right{
	flex:1;
	padding:6px 0 6px 24px;
}
.overview-right .score-wrapper{
	margin-bottom:8px;
	font-size:0;
}
.overview-right .title{
	display:inline-block;
	vertical-align:top;
	line-height:18px;
	font-size:12px;
	color:rgb(7,17,27);
}
.overview-right .star{
	display:inline-block;
	margin:0 12px;
	vertical-align:top;
}
.overview-right .score{
	display:inline-block;
	vertical-align:top;
	line-height:18px;
	font-size:12px;
	color:rgb(255,153,0);
}
.overview-right .delivery-wrapper{
	font-size:0;
}
.delivery-wrapper .title{
	display:inline-block;
	vertical-align:top;
	line-height:18px;
	font-size:12px;
	color:rgb(7,17,27);
}
.delivery{
	margin-left:12px;
	font-size:12px;
	color:rgb(147,153,159);
}
.rating-wrapper{
	padding:0 18px;
}
.rating-item{
	display:flex;
	padding:18px 0;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.avatar{
	flex:0 0 28px;
	width:28px;
	margin-right:12px;
}
.rating-wrapper img{
	border-radius:50%;
}
.rating-wrapper .content{
	position:relative;
	flex:1;
}
.rating-wrapper .name{
	margin-bottom:4px;
	line-height:12px;
	font-size:10px;
	color:rgb(7,17,27);
}
.rating-wrapper .star-wrapper{
	margin-bottom:6px;
	font-size:0;
}
.rating-wrapper .star{
	display:inline-block;
	margin-right:6px;
	vertical-align:top;
}
.rating-wrapper .delivery{
	display:inline-block;
	font-size:10px;
	font-weight:200;
	color:rgb(147,153,159);
	line-height:12px;
}
.rating-wrapper .text{
	margin-bottom:8px;
	line-height:18px;
	color:rgb(7,17,27);
	font-size:12px;
}
.rating-wrapper .recommend{
	line-height:16px;
	font-size:0;
}
.rating-wrapper .icon-dianzan2-copy,.item{
	display:inline-block;
	margin:0 8px 4px 0;
	font-size:9px;
}
.rating-wrapper .icon-dianzan2-copy{
	color:rgb(0,160,220);
}
.rating-wrapper .item{
	padding:0 6px;
	border:1px solid rgba(7,17,27,0.1);
	border-radius:1px;
	color:rgb(147,153,159);
	background-color:#fff;
}
.rating-wrapper .time{
	position:absolute;
	top:0;
	right:0;
	font-size:10px;
	color:rgb(147,153,159);
}
</style>