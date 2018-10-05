<template>
	<div class="cartcontral">
		<transition name="move">
			<div class="cart-decrease iconfont icon-jianhao" v-show="food.count>0" @click.stop="decreaseCart()"></div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div :id="food" class="cart-add iconfont icon-jiahao" @click="addCart(),drop()"></div>
	</div>
</template>
<script>
import Vue from "vue"
export default{
	name:"cartcontral",
	props:{
		food:{
			type:Object
		}
	},
	data(){
		return {
			Cobj:0
		}
	},
	methods:{
		addCart(event){
			if(!this.food.count){
				Vue.set(this.food,"count",1)
				this.food.count=1
			}else{
				this.food.count++
			}
			// this.$dispatch("cart.add",event.target)
			var event=event||window.event
			event.stopPropagation()
			this.Cobj=event.target//点击加号，获取当前点击的事件对象，并赋值给Cobj
			console.log(this.Cobj)
		},
		decreaseCart(){
			if(this.food.count){
				this.food.count--
			}
		},
		drop(){
			// console.log(this.Cobj)
			let oobj=this.Cobj//将赋值过的对象传走
			this.$emit("laiya",oobj)
		}
	}
}
</script>
<style scoped>
.cartcontral{
	font-size:0;
}
.cart-decrease{
	display:inline-block;
	padding:6px;
	line-height:24px;
	font-size:24px;
	transform:rotate(0);
	color:rgb(0,160,220);
	transition:all 0.4s linear;
	z-index:29;
}
.move-enter-active,.move-leave{
	opacity:1;
	transform:rotate(0);
	transform:translate3d(0,0,0);
}
.move-enter,.move-leave-active{
	opacity:0;
	transform:translate3d(24px,0,0) rotate(-180deg);
}
.cart-count{
	display:inline-block;
	vertical-align:top;
	width:12px;
	padding-top:6px;
	line-height:24px;
	text-align:center;
	font-size:10px;
	color:rgb(147,153,159);
}
.cart-add{
	display:inline-block;
	padding:6px;
	line-height:24px;
	font-size:24px;
	color:rgb(0,160,220);
}
</style>