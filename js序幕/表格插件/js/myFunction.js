//封装缓动动画
function slower(obj,json,fn) {//传的参数，对象，json，回掉函数
    //首先第一步，清除定时器
    flag=true
    clearInterval(obj.timer)
    //声明一些要用的变量
    var first=0;target=0,speed=0;
    //要有缓东动画，必须要有定时器，先创建定时器
    obj.timer=setInterval(function () {
        //定时器创建好后，可以开始写环东动画，首先，要将实参拿到，并用起来
        for(var k in json){//用for in遍历json,k是键名，json[k]是键值
            if(k==="scrollTop"){
                first=obj.scrollTop;
                target=parseInt(json[k])
            }else if(k==="opacity"){
                first=parseInt(parseFloat(getstyleattr(obj,k))*100)//将获取到的数字取整
                target=parseInt(parseFloat(json[k])*100)
            }else{
                first=parseInt(getstyleattr(obj,k))//将获取到的数字取整
                target=parseInt(json[k])
            }
            //到这，我们拥有了起始值和目标值，可写欢动动画

            speed=(target-first)*0.2
            if(target>first){
                speed=Math.ceil(speed)
            }else if(target<first){
                speed=Math.floor(speed)
            }
            if(k==="scrollTop"){
                obj.scrollTop=(first+speed)
            }else if(k==="opacity"){
                obj.style.opacity=(first+speed)/100
                obj.style.filter="alpha(opacity:"+(speed+first)+")"
            }else if(k==="zIndex"){
                obj.style[k]=json[k]
            }else{
                obj.style[k]=first+speed+"px"
            }
            if(first!==target){
                flag=false
            }else{
                if(fn){
                    fn()
                }
                clearInterval(obj.timer)
            }
        }
    },20)
}

function getstyleattr(obj,attr) {//用来获取指定对象属性的值
    if(obj.currentStyle){
        return obj.currentStyle[attr]
    }else{
        return window.getComputedStyle(obj,null)[attr]
    }
}