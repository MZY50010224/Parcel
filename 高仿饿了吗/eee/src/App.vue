<template>
  <div id="app">
    <app_header :seller="seller"></app_header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" class="a">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="a">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="a">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import thehead from "./components/header/header.vue"
import {urlParse} from "./util.js"
export default {
  name: 'App',
  data () {
    return {
      seller:{
        id:(()=>{//用一个立即执行函数调用方法来获取url中的id
          let queryParam=urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created (){
    this.$ajax({
      method:"post",
      url:"http://localhost:3000/shuju"
      // data:{
      //   name:"koko"
      // }
    })
    .then((response)=>{
      this.seller=response.data
      console.log(this.seller)
      console.log(typeof(this.seller))
    })
    .catch(function(error){
      console.log(error)
    })
  },
  components:{
    app_header:thehead
  }
}
</script>

<style>
body{
  margin:0;
  padding:0;
}
#app {
  margin: 0;
  padding: 0;
}
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab-item{
  flex: 1;
  text-align: center;
}
.a{
  display: block;
  text-decoration: none;
  color: rgb(77, 85, 93);
  font-size: 14px;
}
.a::after{
  position: relative;
  width: 100%;
  display: block;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(7, 17, 27,0.1);
  content: "";
}
.router-link-active{
  color: rgb(240,20,20)
}
</style>
