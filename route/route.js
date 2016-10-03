var router = require('koa-router')();
var my_channels = require("../task/my_channels");
var channel_list = require("../task/channel_list");
var sense_list = require("../task/sense_list");
var simple_get_things = require("../task/simple_get_things");
router.get('/', index);
router.get("/my_channels", function*() {
    var data = yield my_channels;
    this.body = data;
    // this.body = { foo: 'bar' };
});
router.get("/channel", function*() {
    //yield this.render('index', { name: "yangyu" });

    var data = yield channel_list(this.query.channel_id);
    //console.log(data);
    yield this.render('channel', { thing: JSON.stringify(data) });
});
router.get("/channel_senses", function*() {
    var data = yield channel_list(this.query.channel_id, this.query.last_id);
    //console.log(data);
    this.body = JSON.stringify(data);
});
router.get("/user_senses", function*() {
    var url_pre = `/user/${this.query.user_id}/senses`;
    console.log(url_pre, this.query.last_id);
    var data = yield sense_list(url_pre, this.query.last_id);
    //console.log(data);
    this.body = JSON.stringify(data);
});
router.get("/user_senses_page", function*() {
    var url_pre = `/user/${this.query.user_id}/senses`;
    console.log(url_pre);
    var data = yield sense_list(url_pre);
    var user_profile_data = yield simple_get_things(`/user/${this.query.user_id}/profile`);
    console.log(user_profile_data);
    yield this.render('user_senses', { thing: JSON.stringify(data), profile: JSON.stringify(user_profile_data) });
});
router.get("/user_channel_page", function*() {
    var user_channel_data = yield simple_get_things(`/user/${this.query.user_id}/channels/write`);
    console.log(user_channel_data);
    yield this.render('user_channels', { thing: JSON.stringify(user_channel_data) });
});


router.get("/user_channel_sense_page", function*() {
    var user_channel_data = yield simple_get_things(`/user/${this.query.user_id}/channel/${this.query.channel_id}/senses`);
    console.log(user_channel_data);
    yield this.render('user_channels_sense', { thing: JSON.stringify(user_channel_data) });
});
router.get("/user_channel_senses", function*() {
    var user_channel_data = yield simple_get_things(`/user/${this.query.user_id}/channel/${this.query.channel_id}/senses?offset=${this.query.last_id}`);
    console.log(user_channel_data);
    //console.log(data);
    this.body = JSON.stringify(user_channel_data);
});


function* index() {
    // var data = yield my_channels;
    yield this.render('index');
}

module.exports = router;
