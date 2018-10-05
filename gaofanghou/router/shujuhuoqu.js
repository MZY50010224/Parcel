var Shu=require("../model/shujumodel.js")
var begin=async function(ctx){
	// var name=ctx.request.body.name
	// var geshi=new Shu({
	// 	name:name
	// })
	// try{
	// 	var cun=await geshi.save()
	// }catch(e){
	// 	console.log(e)
	// }
	var zhao=await Shu.find()
	var result={
		errCode:0
	}
	if(!zhao){
		result.errCode=1
		result.errMsg="没有找到相关数据"
		ctx.body=result
	}else{
		result.errCode=0
		result.errMsg="找到相关数据"
		ctx.body=zhao
	}
	

}
module.exports=begin