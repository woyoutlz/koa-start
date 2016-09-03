var router = require('koa-router')();
router.get('/',index);

function *index(){
 	yield this.render('index', { name: "yangyu" });
}

module.exports = router;