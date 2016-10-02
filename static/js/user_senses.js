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
        name: 'same2',
        senses: [],
        last_sense_id: null,
        profile: null
    },
    methods: {
        init: function() {
            var temp = $("#something").html();
            console.log(JSON.parse(temp));
            app.senses = JSON.parse(temp);
            app.last_sense_id = app.senses[app.senses.length - 1]["created_at"]
            var temp = $("#profile").html();
            console.log("profile:", JSON.parse(temp));
            app.profile = JSON.parse(temp);
        },
        load_more_senses: function() {
            var url = "/user_senses";
            $.ajax({
                url: url,
                type: 'get',
                data: {
                    user_id: query["user_id"],
                    last_id: app.last_sense_id
                },
                dataType: 'json',
                success: function(response) {
                    //Do Something
                    console.log(response);
                    app.senses = app.senses.concat(response);
                    app.last_sense_id = app.senses[app.senses.length - 1]["created_at"]
                },
                error: function(xhr) {
                    //Do Something to handle error
                }
            })
        }
    }
})
app.init()
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        app.load_more_senses()
    }
});
