let consumerKey = 'cwOrPxTVTjocRbLwb9CS3LLnD';
let consumerSecret = '9vTVAPV6ypr6xnUOEIV4lhW8zp8sTcE3ErskwzteMg5SHvrVX9';
let bearerCredens = consumerKey + ':' + consumerSecret;
let encodedBase = btoa(bearerCredens);

// POST /oauth2/token HTTP/1.1
// Host: api.twitter.com
// User-Agent: My Twitter App v1.0.23
// Authorization: Basic `${encodedBase}`
// Content-Type: application/x-www-form-urlencoded;charset=UTF-8
// Content-Length: 29
// Accept-Encoding: gzip


const twitterAuth = "https://api.twitter.com/oauth2/token";
const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const twitterTweets = "https://api.twitter.com/1.1/search/tweets.json?q=%23crypto"
$.ajax({
    url: corsAnywhere + twitterAuth,
    method: 'POST',
    headers: {
        "Authorization": `Basic ${encodedBase}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    data: "grant_type=client_credentials"
}).then(function (response) {
    let bearerToken = response.access_token;

    $.ajax({
        url: corsAnywhere + twitterTweets,
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${bearerToken}`,
        }
    }).then(function (tweets) {
        let renderTweets = tweets.statuses;
        $('#tweets').html('<h1 class="tweetHead"> Social Trends </h1>')
        for (let i = 0; i < tweets.statuses.length; i++) {
            twttr.widgets.createTweet(
                renderTweets[i].id_str,
                document.getElementById('tweets'),
                {
                    theme: 'dark',
                    cards: 'hidden',
                    conversation: 'none',
                    align: 'center',
                    linkColor: '#cc66ff'
                }
            ).then(function(el){
            });
        }
    
    });
})
