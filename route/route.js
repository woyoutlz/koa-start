var router = require('koa-router')();
router.get('/', index);

function* cool() {
    console.log("cool");
    return "yangyu"
}

function* index() {
    var x = yield cool;
    yield this.render('index', { name: x });
}

module.exports = router;
