//该函数用来解析url地址

export function urlParse(){
	let url = window.location.search//拿到url
	let obj={}
	let reg=/[?&][^?&]+=[^?&]+/g
	let arr=url.match(reg)//检索字符串,找到一个或多个与正则表达式匹配的文本,依赖检索的正则表达式有没有标志g
	//["?id=12345","&a=b"]
	if(arr){
		arr.forEach((item)=>{
			let tempArr=item.substring(1).split("=")
			let key=decodeURIComponent(tempArr[0])  
			let val=decodeURIComponent(tempArr[1]) 
			obj[key]=val
		})
	}
	return obj
}