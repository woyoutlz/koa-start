var router = require('koa-router')();
var my_channels = require("../task/my_channels");
router.get('/', index);
router.get("/my_channels", function*() {
    var data = yield my_channels;
    this.body = data;
    // this.body = { foo: 'bar' };
});


function* cool() {
    console.log("cool");
    return "yangyu"
}

function* index() {
    yield this.render('index');
}

module.exports = router;
