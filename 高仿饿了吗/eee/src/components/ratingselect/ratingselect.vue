<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0)" class="block positive" :class="{'active2':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1)" class="block negative" :class="{'active3':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch">
			<span class="iconfont icon-duihao" :class="{'on':onlyContent}"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
const POSITIVE=0
const NEGATIVE=1
const ALL=2
export default{
	name:"rating",
	props:{
		ratings:{
			type:Array,
			default(){
				return []
			}//对象和数组这种引用类型的默认值需要用函数的返回值来设置
		},
		selectType:{
			type:Number,
			default:ALL//简单类型就直接写就好
		},
		onlyContent:{
			type:Boolean,
			default:false
		},
		desc:{
			type:Object,
			default(){
				return {
					all:"全部",
					positive:"满意",
					negative:"不满意"
				}
			}
		}
	},
	computed:{
		positives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===POSITIVE
			})//filter在vue中是过滤的意思，过滤东西,需要注意
		},
		negatives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===NEGATIVE
			})
		}
	},
	methods:{
		select(type){
			this.selectType=type
			this.$emit("rts",type)
		},
		toggleContent(){
			this.onlyContent=!this.onlyContent
			this.$emit("rtss",this.onlyContent)
		}
	}
}
</script>
<style scoped>
.rating-type{
	padding:18px 0;
	margin:0 18px;
	font-size:0;
}
.ratingselect .block{
	display:inline-block;
	padding:8px 12px;
	margin-right:8px;
	border-radius:1px;
	line-height:16px;
	color:rgb(77,85,93);
	font-size:12px;
}
.ratingselect .active{
	color:#fff;
	background-color:rgb(0,160,220)!important;
}
.block .count{
	margin-left:2px;
	font-size:8px;
}
.ratingselect .positive{
	background-color:rgba(0,160,220,0.2);
}
.ratingselect .active2{
	color:#fff;
	background-color:rgb(0,160,220)!important;
}
.ratingselect .negative{
	background-color:rgba(77,85,93,0.2);
}
.ratingselect .active3{
	color:#fff;
	background-color:rgb(77,85,93)!important;
}
.switch{
	padding:12px 18px;
	line-height:24px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	color:rgb(147,153,159);
	font-size:0;
}
.icon-duihao{
	display:inline-block;
	vertical-align:top;
	margin-right:4px;
	font-size:24px;
}
.on{
	color:#00c850;
}
.text{
	display:inline-block;
	vertical-align:top;
	font-size:12px;
}
</style>