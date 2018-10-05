<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>
<script>
const LENGTH=5
const CLS_ON="on"
const CLS_HALF="half"
const CLS_OFF="off"

export default{
		name:"star",
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		data (){
			return {
				on:{},
				half:{},
				off:{}
			}
		},
		computed:{
			starType(){
				return "star-"+this.size//通过传入值的不同生成不同样式名
			},
			itemClasses(){
				let result=[];
				let score=Math.floor(this.score*2)/2;//将获取的值向下0.5取整
				let hasDecimal = score % 1 !== 0;
				let integer=Math.floor(score);//之后遍历整星加入数组，再放入半星，拼接i起来即可
				for(var i=0;i<integer;i++){
					result.push(CLS_ON)
				}
				if(hasDecimal){
					result.push(CLS_HALF)
				}
				while(result.length<LENGTH){
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
	//itemClass属性是动态的，有三种状态，没星，半星，全星
	//通过判断属性值来改变属性绑定

	//把每一颗星拆开，一个一个显示，先显示满星，再显示半星，最后显示没星，通过prps传值并遍历该值生成星星，绑定不同class实现不同星星
</script>
<style scoped>
.star{
	font-size:0;
}
.star-item{
	display:inline-block;
	background-repeat:no-repeat;

}
.star-48>.star-item{
	width:20px;
	height:20px;
	margin-right:22px;
	background-size:20px 20px;
}
.star-48>.star-item:last-child{
	margin-right:0;
}
.star-48>.on{
	background-image:url("./star48_on@3x.png");
}
.star-48>.half{
	background-image:url("./star48_half@3x.png");
}
.star-48>.off{
	background-image:url("./star48_off@3x.png");
}

.star-36>.star-item{
	width:15px;
	height:15px;
	margin-right:6px;
	background-size:15px 15px;
}
.star-36>.star-item:last-child{
	margin-right:0;
}
.star-36>.on{
	background-image:url("./star36_on@3x.png");
}
.star-36>.half{
	background-image:url("./star36_half@3x.png");
}
.star-36>.off{
	background-image:url("./star36_off@3x.png");
}

.star-24>.star-item{
	width:10px;
	height:10px;
	margin-right:3px;
	background-size:10px 10px;
}
.star-24>.star-item:last-child{
	margin-right:0;
}
.star-24>.on{
	background-image:url("./star24_on@3x.png");
}
.star-24>.half{
	background-image:url("./star24_half@3x.png");
}
.star-24>.off{
	background-image:url("./star24_off@3x.png");
}

</style>