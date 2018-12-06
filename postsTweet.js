var Twitter = require('twitter');
var postsLog = require('./postsLog.js');
var client = new Twitter({
    consumer_key:           process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:        process.env.TWITTER_CONSUMER_SECRET,
    access_token_key:       process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret:    process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function check(data) {
    if(data == "") {
        return false;
    }
    else {
        return true;
    }
}

// Format the post into a tweet
function format_post(post) {
    var lod = 7;
    do {
        var tweet = "Newly confirmed leak";
        if(check(post.amount && lod >= 4))
            tweet += " of " + post.amount;
        if(check(post.city))
            tweet += " in " + post.city;
        if(check(post.facility && lod >= 6))
            tweet += " at the " + post.facility + " facility";
        if(check(post.watershed))
            tweet += " into the " + post.watershed + " watershed";
        if(check(post.location) && lod >= 7)
            tweet += " from " + post.location;
        if(check(post.end_date) && lod >= 3)
            tweet += ", ending on " + post.end_date;
        if(check(post.time_frame) && lod >= 5)
            tweet += " from " + post.time_frame;
        tweet += ".";
        lod--;
    } while(tweet.length > 280);
    return tweet;
}

// Post all the new reviewed posts to Twitter
exports.tweet_post = function(in_posts) {
    in_posts.posts.forEach(function(post) {
        var tweet = format_post(post);
        postsLog.posts_log(tweet);
        client.post('statuses/update', {status: tweet},  function(error, tweet_body, response) {
            if(error) throw error;
            console.log("Submitted Post Tweet");
        });
    });
};

// Format the alert into a Tweet
function format_alert(alert) {
    var lod = 4;
    do {
        var tweet = "Alert! new leak reported";
        if(check(alert.city && lod >= 3))
            tweet += " in " + alert.city;
        if(check(alert.facility) && lod >= 4)
            tweet += " at the " + alert.facility + " facility";
        if(check(alert.watershed))
            tweet += " into the " + alert.watershed + " watershed";
        tweet += ",";
        if(check(alert.time && lod >= 2))
            tweet += " at " + alert.time;
        tweet += " updates will be posted after review by DEC Staff.";
        lod--;
    } while(tweet.length > 280);
    return tweet;
}

// Post all the new alerts to Twitter
exports.tweet_alert = function(alerts) {
    alerts.posts.forEach(function(alert) {
        var tweet = format_alert(alert);
        postsLog.posts_log(tweet);
        client.post('statuses/update', {status: tweet},  function(error, tweet_body, response) {
            if(error) throw error;
            console.log("Submitted Alert Tweet");
        });
    });
};