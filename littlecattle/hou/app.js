var Koa=require("koa")
var app=new Koa()
var koaBody=require("koa-body")
var route=require("koa-route")
var cors=require("koa2-cors")
var koastatic=require("koa-static")
var path=require("path")
var koastatics = koastatic(path.join(__dirname));

app.use(cors({
    origin: "*", 
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous']
}));//解决跨域
app.use(koaBody());
app.use(koastatics)
app.use(route.post("/reg",require("./route/reg.js")))
app.use(route.post("/login",require("./route/login.js")))
app.use(route.post("/main",require("./route/main.js")))
app.use(route.post("/xiang",require("./route/xiang.js")))
app.use(route.post("/gouwuche",require("./route/gouwuche.js")))
app.use(route.post("/dingdan",require("./route/dingdan.js")))
app.use(route.post("/huoding",require("./route/huoding.js")))
app.use(route.post("/shoucangjia",require("./route/shoucangjia.js")))
app.use(route.post("/xianshou",require("./route/xianshou.js")))
app.use(route.post("/yonghu",require("./route/yonghu.js")))
//在后端判断好，在这里加路由，后台的判断主要是连接数据库进行查询，看有没有此数据，有了一种情况，没有另一种情况


app.listen(8080)