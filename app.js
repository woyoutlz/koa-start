var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var render = require('koa-swig');
var router = require("./route/route")
var path = require("path")
app.use(serve('static'));
app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: false, // disable, set to false 
    ext: 'html',
    varControls: ['{{ ', ' }}']
});
/* 中间件
app.use(function*(next) {
    this; // is the Context
    this.request; // is a koa Request
    this.response; // is a koa Response

    console.log('start');
    yield next;
    console.log('end');
});
*/
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
