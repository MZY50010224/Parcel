<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="iconfont icon-gouwuche" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="drop" tag="div">
				<div v-for="ball in balls" :key="ball.key" v-show="ball.show" class="ball"></div>
			</transition-group>
		</div>

		<transition name="fold">
			<div class="shopcart-list" v-show="listshow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontral-wrapper">
								<cartcontral :food="food"></cartcontral>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="list-msk" @click="hideList" v-show="listshow"></div>
		</transition>
	</div>

</template>
<script>
import cartcontral from "../cartcontral/cartcontral.vue"
import foodb from "../food/food.vue"
import BScroll from "better-scroll";
export default{
	name:"shopcart",
	props:{
		selectFoods:{//goods组件传过来的值，代表各种商品购买个数和单价的数组
			type:Array,
			default(){
				return []//默认值如果是对象或数组，就要用函数包裹
			}
		},
		deliveryPrice:{
			type:Number,
			default:0//这个是默认值的意思
		},
		minPrice:{
			type:Number,
			default:0
		},
		// tar:{
		// 	type:HTMLDivElement
		// }
	},
	components:{
		cartcontral:cartcontral
	},
	data(){
		return {
			balls:[{
				show:false,
				key:0
			},{
				show:false,
				key:1
			},{
				show:false,
				key:2
			},{
				show:false,
				key:3
			},{
				show:false,
				key:4
			}],
			dropBalls:[],
			fold:true
		}
	},
	computed:{
		//总价是每个商品单价乘以数量的总和
		totalPrice(){
			let total=0//总价
			this.selectFoods.forEach((food)=>{
				total+=food.price*food.count
			})
			return total//代表购物车中所有物品总价
		},
		totalCount(){
			let count=0
			this.selectFoods.forEach((food)=>{
				count+=food.count
			})
			return count//代表购物车中所有物品数量总和
		},
		payDesc(){
			if(this.totalPrice===0){
				return '￥'+this.minPrice+'元起送'
			}else if(this.totalPrice<this.minPrice){
				let diff=this.minPrice-this.totalPrice
				return "还差￥"+diff+"元起送"
			}else{
				return "去结算"
			}
		},
		payClass(){
			if(this.totalPrice<this.minPrice){
				return "no-enough"
			}else{
				return "enough"
			}
		},
		listshow(){
			if(!this.totalCount){//如果没有购买任何东西
				this.fold=true//fold为true
				return false//false隐藏
			}
			let show=!this.fold//如果买了东西，则显示
			if(show){//如果该组件显示，则初始化betterscroll插件，初始化方法如下
				this.$nextTick(()=>{
					if(!this.scroll){
							this.scroll=new BScroll(this.$refs.listContent,{
							click:true
						})
					}else{
						this.scroll.refresh()//重新计算内层和外层的大小并决定是否要启用滑动
					}
					
				})
			}
			return show
		}
	},
	methods:{
		drop(el){//每点击一次加号都会触发一次这个事件，循环一遍小球数组
			for(var i=0;i<this.balls.length;i++){//循环所有小球
				let ball=this.balls[i]//拿到具体小球
				if(!ball.show){//如果小球show是false隐藏
					ball.show=true//让他显示
					ball.el=el//给每一个具体小球添加属性el，即加号对象
					this.dropBalls.push(ball)//将小球添加进掉落后的数组中
					// console.log(ball.el)//这里的el对象是对的，是点击加号的对象源
					// console.log(this.dropBalls)
					return
				}
			}
		},
		beforeEnter(el){//这里的对象是小球，因为这是过渡函数钩子，所以作用的对象只能是绑定的小球对象
			//之前小球就一直存在，在左下角，被隐藏着，现在遍历他们，并让他们显示
			let count=this.balls.length//声明一个count等于balls数组长度
			while(count--){//让长度递减
				let ball=this.balls[count]//将每一个球都声明变量ball
				if(ball.show){//如果小球为显示状态，则
					let rect=ball.el.getBoundingClientRect()//获取当前点击的加号相对于视口的位置集合
					let x=rect.left-32//拿到左间距
					let y=(window.innerHeight-(rect.top+667))//拿到上间距
					el.style.display=""//让小球显示
					el.style.webkitTransform=`translate3d(${-x}px,${y}px,0)`
					el.style.transform=`translate3d(${-x}px,${y}px,0)`
					// console.log(x,y,el,window.innerHeight)
				}
			}
		},
		enter(el){
			// console.log("b")
			let rf=el.offsetHeight//浏览器重绘
			this.$nextTick(()=>{
				el.style.webkitTransform="translate3d(0,0,0)"
				el.style.transform="translate3d(0,0,0)"
				// el.style.display="block"
			})
		},
		afterEnter(el){//在这里ball和el指向同一个对象
			// console.log("c")
			let ball=this.dropBalls.shift()//shift删除该数组第一个值,这里取到刚刚删除的值,而前面刚刚加进来一个显示的小球，所以到这里
			//该数组被清空了
			if(ball){//如果删除的该小球为显示状态
				ball.show=false//让他变为隐藏状态
				el.style.display="block"//设置为隐藏
			}
		},
		toggleList(){//作用是取反，当买了东西时，点击显示隐藏
			if(!this.totalCount){
				return
			}
			this.fold=!this.fold
		},
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0
			})
		},
		hideList(){
			this.fold=true//会触发之前有一个地方的再计算，在listshow方法里!!!!!
		},
		pay(){
			if(this.totalPrice<this.minPrice){
				return
			}//如果当前总价小于起送价，则直接return掉，不能进行任何操作
			window.alert(`支付${this.totalPrice}元`)//.stop修饰符可以阻止事件冒泡
		}
	}
}
</script>
<style scoped>
.shopcart{
	position:fixed;
	left:0;
	bottom:0;
	z-index:50;
	width:100%;
	height:48px;
}
.content{
	display:flex;
	background-color:#141d27;
	font-size:0;
}
.content-left{
	flex:1;
}
.logo-wrapper{
	display:inline-block;
	position:relative;
	top:-10px;
	margin:0 12px;
	padding:6px;
	width:56px;
	height:56px;
	box-sizing:border-box;
	vertical-align:top;
	border-radius:50%;
	background-color:#141d27;
}
.logo{
	width:100%;
	height:100%;
	border-radius:50%;
	background-color:#2b343c;
	text-align:center;
}
.logo-wrapper .highlight{
	background-color:rgb(0,160,220);
}
.icon-gouwuche{
	line-height:44px;
	font-size:24px;
	color:#80858a;
}
.logo .highlight{
	color:white;
}
.price{
    display:inline-block;
    vertical-align:top;
    margin-top:12px;
    line-height:24px;
    padding-right:12px;
    color:rgba(255,255,255,0.4);
    box-sizing:border-box;
    border-right:1px solid rgba(255,255,255,0.4);
    font-size:16px;
    font-weight:700;
}
.content-left .highlight{
	color:white;
}
.desc{
	display:inline-block;
	vertical-align:top;
	margin:12px 0 0 12px;
	line-height:24px;
	color:rgba(255,255,255,0.4);
	font-size:10px;
}
.content-right{
	flex:0 0 105px;
	width:105px;
}
.pay{
	height:48px;
	line-height:48px;
	text-align:center;
	font-size:12px;
	color:rgba(255,255,255,0.4);
	font-weight:700;
	background-color:#2b333b;
}
.no-enough{
	background-color: #2b333b;
}
.enough{
	background-color: #00b43c;
	color: white;
}
.num{
	position:absolute;
	top:0;
	right:0;
	width:24px;
	height:16px;
	text-align:center;
	line-height:16px;
	border-radius:16px;
	font-size:9px;
	font-weight:700;
	color:#fff;
	background-color:rgb(240,20,20);
	box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
}
.ball{
	position:fixed;
	left:35px;
	bottom:50px;
	width:16px;
	height:16px;
	border-radius:50%;
	background-color:rgb(0,160,220);
	z-index:200;
	transition:all 0.4s linear;
}
.shopcart-list{
	position:absolute;
	left:0;
	top:0;
	z-index:-1;
	width:100%;
	transition:all 0.5s linear;
	transform:translate3d(0,-100%,0);
}
.fold-enter,.fold-leave-to{
	transform:translate3d(0,0,0);
}
.fold-enter-to,.fold-leave{
	transform:translate3d(0,-100%,0);
}
.shopcart-list .list-header{
	height:40px;
	line-height:40px;
	padding:0 18px;
	background-color:#f3f5f7;
	border-bottom:1px solid rgb(7,17,27,0.1);
}
.shopcart-list .title{
	float:left;
	font-size:14px;
	color:rgb(7,17,27);
}
.shopcart-list .empty{
	float:right;
	font-size:12px;
	color:rgb(0,160,220);
	font-weight:200;
}
.shopcart-list .list-content{
	padding:0 18px;
	max-height:217px;
	overflow:hidden;
	background-color:#fff;
}
.shopcart-list .food{
	position:relative;
	padding:12px 0;
	box-sizing:border-box;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.shopcart-list .name{
	line-height:24px;
	font-size:14px;
	color:rgb(7,17,27);
}
.shopcart-list .price{
	position:absolute;
	right:90px;
	bottom:12px;
	line-height:24px;
	font-size:14px;
	font-weight:700;
	color:rgb(240,20,20);
}
.shopcart-list .cartcontral-wrapper{
	position:absolute;
	right:0;
	bottom:6px;
}
.list-msk{
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:-2;
	backdrop-filter:blur(10px);
	transition:all 0.5s;
	background-color:rgba(7,17,27,0.6);
}
.fade-enter,.fade-leave-to{
	opacity:0;
	background-color:rgba(7,17,27,0);
}
.fade-enter-to,.fade-leave{
	opacity:1;
	background-color:rgba(7,17,27,0.6);
}
</style>