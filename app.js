var koa = require('koa');
var app = koa();
var render = require('koa-swig');
var router = require("./route/route")
var path = require("path")
app.context.render = render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: false, // disable, set to false 
  ext: 'html',
  varControls: ['{{ ', ' }}']
});
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);


