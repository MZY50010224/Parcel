var Koa=require("koa")
var app=new Koa()
var koaBody=require("koa-body")
var route=require("koa-route")
var cors=require("koa2-cors")
var koastatic=require("koa-static")
var path=require("path")
const koastatics = koastatic(path.join(__dirname));

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
app.use(route.post("/shuju",require("./router/shujuhuoqu.js")))//在后端判断好，在这里加路由，后台的判断主要是连接数据库进行查询，看有没有此数据，有了一种情况，没有另一种情况
// app.use()

app.listen(3000)