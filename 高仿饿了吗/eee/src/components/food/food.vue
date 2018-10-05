<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img class="kaixin" :src="food.image">
					<div class="back" @click="hide">
						<i class="iconfont icon-houtui"></i>
					</div>		
				</div>
				<div class="content">
					<div class="title">{{food.name}}</div>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontral-wrapper">
					<cartcontral @laiya="jieshou" :food="food"></cartcontral>
					</div>
					<transition name="fade">
						<div @click="addFirst(),drop()" class="buy" v-show="!food.count||food.count===0">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect @rtss="lp" @rts="rtss" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings&&food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" width="12" height="12" :src="rating.avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span class="iconfont" :class="{'icon-dianzan2-copy':rating.rateType===0,'icon-bad_active':rating.rateType===1}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import Vue from "vue"
import {formatDate} from "./date.js"//可以用正则表达式遍历数据然后一次排列成你想要的格式s
import BScroll from "better-scroll"
import cartcontral from "../cartcontral/cartcontral.vue"
import split from "../split/split.vue"
import ratingselect from "../ratingselect/ratingselect.vue"
const All=2
export default{
	name:"food",
	props:{
		food:{
			type:Object
		}
	},
	data(){
		return{
			showFlag:false,
			Cobj:null,
			selectType:All,
			onlyContent:true,
			desc:{
				all:"全部",
				positive:"推荐",
				negative:"吐糟"
			}
		}
	},
	filters:{//filter是过滤,在这里写一个filters,来专门存放过滤用的函数
		formatDate(time){
			let date=new Date(time)//将该数据转换成一个date类型的对象
			return formatDate(date,"yyyy-MM-tt hh:mm")//用该方法去进行字符串格式的改变,通用方法可以写进common中,需要的时候引用就行
		}
	},
	methods:{//如果子组件中修改的值为数值类型,那么字组件中修改该类型并不会影响父组件中的相应值
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
		rtss(type){
			this.selectType=type
			console.log(this.selectType)
		},
		lp(j){
			this.onlyContent=j
			console.log(this.onlyContent)
		},
		show(){
			selectType:All
			onlyContent:true
			this.showFlag=true
			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.food,{
						click:true
					})
				}else{
					this.scroll.refresh()
				}
			})
		},
		hide(){
			this.showFlag=false
		},
		addFirst(event){
			Vue.set(this.food,"count",1)
			//在这里将触发事件的对象传给shopcart
			event=event||window.event
			this.Cobj=event.target
		},
		drop(){
			// console.log(this.Cobj)
			let oobj=this.Cobj//将赋值过的对象传走
			this.$emit("laiya",oobj)//需要将事件对象传走，传到shopcart中，之前是传到goods父组件，再通过父组件广播道shopcart中
			//那个里面有点击事件，触发会获取当前按钮的位置
		},
		jieshou(a){
            // this.tar=a
            // console.log(a)
            // this.$nextTick(()=>{//体验优化，异步执行
            //     this.$refs.shopcart.drop(a)
            // })
            this.$emit("laiya",a)
           
            console.log("a")//触发事件成功
        }
	},
	components:{
		cartcontral,
		split,
		ratingselect
	}
}
</script>
<style scoped>
.food{
	position:fixed;
	left:0;
	top:0;
	bottom:48px;
	z-index:30;
	width:100%;
	background-color:#fff;
	transition:all 0.2s linear;
	transform:translate3d(0,0,0);
}
.move-enter,.move-leave-active{
	transform:translate3d(100%,0,0);
}
.image-header{
	position:relative;
	width:100%;
	height:0;
	padding-top:100%;
}
.kaixin{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
}
.back{
	position:fixed;
	top:10px;
	left:0;
}
.icon-houtui{
	display:block;
	padding:10px;
	font-size:20px;
	color:white;
}
.content{
	position:relative;
	padding:18px;
}
.title{
	line-height:14px;
	margin-bottom:8px;
	font-size:14px;
	font-weight:700;
	color:rgb(7,17,27);
}
.detail{
	margin-bottom:18px;
	line-height:10px;
	font-size:0;
	height:10px;
}
.sell-count,.rating{
	font-size:10px;
	color:rgb(147,153,159);
}
.sell-count{
	margin-right:12px;
}
.price{
	font-weight:700;
	line-height:24px;
}
.now{
	margin-right:8px;
	font-size:14px;
	color:rgb(240,20,20);
}
.old{
	text-decoration:line-through;
	font-size:10px;
	color:rgb(147,153,159);
}
.cartcontral-wrapper{
	position:absolute;
	right:12px;
	bottom:12px;
}
.buy{
	position:absolute;
	right:18px;
	bottom:18px;
	z-index:10;
	height:24px;
	line-height:24px;
	padding:0 12px;
	box-sizing:border-box;
	border-radius:12px;
	font-size:10px;
	color:#fff;
	background-color:rgb(0,160,220);
	transition:all 0.2s;
	opacity:1;
}
.fade-enter,.fade-leave-active{
	opacity:0;
}
.info{
	padding:18px;
}
.info .title{
	line-height:14px;
	margin-bottom:6px;
	font-size:14px;
	color:rgb(7,17,27);
}
info .text{
	line-height:24px;
	padding:0 8px;
	font-size:12px;
	color:rgb(77,85,93);
}
.rating{
	padding-top:18px;
}
.rating .title{
	line-height:14px;
	margin-left:18px;
	font-size:14px;
	color:rgb(7,17,27);
}
.rating-wrapper{
	padding:0 18px;
}
.rating-wrapper .rating-item{
	position:relative;
	padding:16px 0;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.user{
	position:absolute;
	right:0;
	bottom:16px;
	line-height:12px;
	font-size:0;
}
.name{
	display:inline-block;
	margin-right:6px;
	vertical-align:top;
	font-size:10px;
	color:rgb(147,153,159);
}
.avatar{
	border-radius:50%;
}
.time{
	margin-bottom:6px;
	line-height:12px;
	font-size:10px;
	color:rgb(147,153,159);
}
.text{
	line-height:16px;
	font-size:12px;
	color:rgb(7,17,27);
}
.icon-dianzan2-copy,.icon-bad_active{
	margin-right:4px;
	line-height:24px;
	font-size:12px;
}
.icon-dianzan2-copy{
	color:rgb(0,160,220);
}
.icon-bad_active{
	color:rgba(77,85,93,0.5);
}
.no-rating{
	padding:16px 0;
	font-size:12px;
	color:rgb(147,153,159);
}
</style>