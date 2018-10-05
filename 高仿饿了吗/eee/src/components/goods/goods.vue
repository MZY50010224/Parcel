<template>
    <div id="goods">
        <div class="menu-wrapper" ref="menuWrapper">
        	<ul class="uul">
        		<li v-for="(item,index) in goods[0].goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
        			<span class="text">
        				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        			</span>
        		</li>
        	</ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
        	<ul>
        		<li v-for="item in goods[0].goods" class="food-list food-list-hook">
        			<h1 class="title">{{item.name}}</h1>
        			<ul>
        				<li @click="selectFood(food)" v-for="food in item.foods" class="food-item">
        					<div class="icon">
        						<img width="57" height="57" :src="food.icon">
        					</div>
        					<div class="content">
        						<h2 class="name">{{food.name}}</h2>
        						<p class="desc">{{food.description}}</p>
        						<div class="extra">
        							<span class="count">月售{{food.sellCount}}份</span>
        							<span>好评率{{food.rating}}%</span>
        						</div>
        						<div class="price">
        							<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
        						</div>
        						<div class="cartcontral-wrapper">
        							<cartcontral @laiya="jieshou" :food="food"></cartcontral>
        						</div>
        					</div>
        				</li>
        			</ul>
        		</li>
        	</ul>
        </div>
        <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller[0].seller.deliveryPrice" :minPrice="seller[0].seller.minPrice"></shopcart>
        <food @laiya="jieshou" :food="selectedFood" ref="food"></food>
    </div>
</template>
<script>
import food from "../food/food.vue"
import cartcontral from "../cartcontral/cartcontral.vue"
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart.vue"


export default {
    name:"goods",
    props:{
    	seller:{
    		type:Object
    	}
    },
    data (){
    	return {
    		goods:[],
    		listHeight:[],//每一个板块与顶点对齐时的scroll
    		scrollY:0,//总板块的scorll
            selectedFood:{}
    	}
    },
    computed:{
    	currentIndex(){
    		for(var i=0;i<this.listHeight.length;i++){
    			//i为索引，与左边导航栏索引相同，当右边总scroll在一定区间时，索引为i
    			let height1=this.listHeight[i]
    			let height2=this.listHeight[i+1]
    			if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
    				return i
    			}
    				//因为scrollY是实时监听，所以这里遍历也要跟着变，即设置为实时的,而vue自身就有这种功能，scrolly变化时，
    				//computed也会跟着改变
    			
    		}
    		return 0
    	},
    	selectFoods(){
    		let foods=[]
    		this.goods[0].goods.forEach((good)=>{
    			good.foods.forEach((food)=>{
    				if(food.count){
    					foods.push(food)//可拿到所有被选中的食物的数据
    				}
    			})
    		})
    		return foods
    	}
    },
    created(){
    	this.classMap=["decrease","discount","special","invoice","guarantee"],
    	this.$ajax({
    		method:"post",
    		url:"http://localhost:3000/shuju"
    	})
    	.then((response)=>{
    		this.goods=response.data
    		console.log(this.goods)
    		this.$nextTick(()=>{
    			this.menuScroll=new BScroll(this.$refs.menuWrapper,{
    				click:true
    			});
    			this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
    				click:true,
    				probeType:3//实时监测该板块滚动位置
    			});
    			this.foodsScroll.on("scroll",(pos)=>{//pos代表位置
    				this.scrollY=Math.abs(Math.round(pos.y))
    			})
    			this._calculateHeight();
    		})
    		
    	})
    },
    components:{
    	shopcart,
    	cartcontral,
        food
    },
    methods:{
    	// _initScroll(){
    	// 	this.menuScroll=new BScroll(this.$refs.menuWrapper,{})
    	// 	this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{})
    	// 	// console.log(this.$refs.menuWrapper)
    	// },
    	selectMenu(index){
    		let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
    		let el=foodList[index]
    		this.foodsScroll.scrollToElement(el,300)
    			// console.log(index)
    	},
    	_calculateHeight(){
    		let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")//大的一类总li标签
    		let height=0
    		this.listHeight.push(height)
    		for(var i=0;i<foodList.length;i++){
    			//计算出每一整块类的高度，并分别添加进数组，所以要有一个值，不断往上加
    			// console.log(this.listHeight)
    				let y=foodList[i].clientHeight
    				//console.log(y)//y是每一块的高
    				height+=y
    				this.listHeight.push(height)
    		}
    	},
        selectFood(food){
            this.selectedFood=food
            this.$refs.food.show()
            // console.log(this.selectedFood) success!
        },
        jieshou(a){
            // this.tar=a
            // console.log(a)
            this.$nextTick(()=>{//体验优化，异步执行
                this.$refs.shopcart.drop(a)
            })
           
            console.log(a)
        }
    }
}
</script>
<style spoced>
*{
	margin:0;
	padding:0;
	list-style:none;
}
#goods{
	display:flex;
	position:absolute;
	top:180px;
	bottom:46px;
	width:100%;
	overflow:hidden;
}
.menu-wrapper{
	flex:0 0 80px;
	width:80px;
	background-color:#f3f5f7;
}
.menu-item{
	display:table;
	height:54px;
	width:56px;
	line-height:14px;
	padding:0 12px;
}
.menu-item .icon{
	display:inline-block;
	vertical-align:top;
	width:12px;
	height:12px;
	margin-right:2px;
	background-size:12px 12px;
	background-repeat:no-repeat;
}
.menu-item .decrease{
    background-image:url("./decrease_3@2x.png")
}
.menu-item .discount{
    background-image:url("./discount_3@2x.png")
}
.menu-item .guarantee{
    background-image:url("./guarantee_3@2x.png")
}
.menu-item .invoice{
    background-image:url("./invoice_3@2x.png")
}
.menu-item .special{
    background-image:url("./special_3@2x.png")
}
.menu-item .text{
	display:table-cell;
	width:56px;
	vertical-align:middle;
	font-size:12px;	
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.foods-wrapper{
	flex:1;
}
.foods-wrapper .title{
	padding-left:14px;
	height:26px;
	line-height:26px;
	border-left:2px solid #d9dde1;
	font-size:12px;
	color:rgb(147,153,159);
	background-color:f3f5f7;
}
.foods-wrapper .food-item{
	display:flex;
	margin:18px;
	padding-bottom:18px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.foods-wrapper .food-item:last-child{
	border-bottom:none;
	padding-bottom:0;
}
.foods-wrapper .icon{
	flex:0 0 57px;
	margin-right:10px;
}
.foods-wrapper .content{
	position:relative;
	top:0;
	left:0;
	flex:1;
}
.foods-wrapper .name{
	margin:2px 0 8px 0;
	height:14px;
	line-height:14px;
	font-size:14px;
	color:rgb(7,17,27);
}
.foods-wrapper .desc,.extra{
	
	line-height:10px;
	font-size:10px;
	color:rgba(147,153,159);
}
.foods-wrapper .desc{
	margin-bottom:8px;
	line-height:12px;
}
.foods-wrapper .count{
	margin-right:12px;
}
.foods-wrapper .price{
	font-weight:700;
	line-height:24px;
}
.foods-wrapper .now{
	margin-right:8px;
	font-size:14px;
	color:rgb(240,20,20);
}
.foods-wrapper .old{
	text-decoration:line-through;
	font-size:10px;
	color:rgb(147,153,159);
}
.current{
	position:relative;
	margin-top:-1px;
	font-weight:700;
	background-color:#fff;
}
.current text{
	border-bottom:none;
}
.cartcontral-wrapper{
	position:absolute;
	right:0;
	bottom:-7px;
}
</style>