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
        my_channels: []
    },
    methods: {
        init: function() {
            var url = "/my_channels"
            $.get(url, function(data) {
                console.log(JSON.parse(JSON.stringify(data)));
                app.my_channels = data["subscribe_channels"];
            })
        }
    }
})
app.init()
