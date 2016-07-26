$(document).ready(function() {

    var getQuote = function() {
        return $.ajax({
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
            headers: {
                'X-Mashape-Key': 'MUzqdeOSo1mshCuear7hljNznBWrp1N5SPTjsngfXZ9xvMJ9dv'
            },
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
        })
    };

    var setQuote = function(data) {
        var encodedQuote = encodeURIComponent(data.quote);
        var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodedQuote;
        $('.quote').text(data.quote);
        $('.author').text(data.author);
        $('.btnTweet').attr('href', tweetUrl);
    };
    
    $('.btnReload').on('click', function() {
        var reloadBtn = $(this);
        reloadBtn.prop('disabled', true).children('i').addClass('fa-spin');
        getQuote().done(function(data) {
            setQuote(data);
            reloadBtn.prop('disabled', false).children('i').removeClass('fa-spin');
        });
    });
    
});