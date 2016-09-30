var request = require("request");
var config = require("../config.js")
var my_id = config["my_user_id"]
var token = config["token"]
var host = config["v2_host"]
var api_host = config["api_host"]
module.exports = function(cb) {
    console.log(111);
    var user_id = user_id
    var url = api_host + "/user/" + my_id + "/channels"

    var options = {
        url: url,
        headers: {
            "Host": host,
            "Accept": "application/json",
            "Machine": "ios|301|iPhone OS 10.0.1|iPhone|1242|2148",
            "Authorization": "Token " + token,
            "X-Same-Request-ID": "8E5B18BD-0241-4C72-B6DE-67ADE56C6B4D",
            "encode_type": "json",
            "Accept-Language": "zh-Hans-CN;q=1",
            "X-same-Device-UUID": "2527BBCB-5C82-4DC0-B2B9-A65810AFBB2B",
            "Accept-Encoding": "gzip, deflate",
            "User-Agent": "same-appstore2/606 (iPhone; iOS 10.0.1; Scale/3.00)",
            "timezone": "Asia/Shanghai",
            "Connection": "keep-alive",
            "X-Tingyun-Id": "S2owl8xSHsI;c=2;r=692779298",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        gzip: true
    };
    var out = []
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            newest_data = JSON.parse(body)
            cb(null, newest_data["data"])

        } else {
            console.log(err, response.statusCode)
        }
    })
}
