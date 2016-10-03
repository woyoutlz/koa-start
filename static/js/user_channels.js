function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}
var query = getQueryParams(document.location.search);

var app = new Vue({
    el: '#app',
    data: {
        name: 'same',
        mets: [],
        my_channels: [],
        user_id: query.user_id
    },
    methods: {
        init: function() {
            var temp = $("#something").html();
            console.log(JSON.parse(temp));
            app.my_channels = JSON.parse(temp)["writed_channels"]
        }
    }
})
app.init()
