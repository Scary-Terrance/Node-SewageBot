// Imports
var html = require("./postLoad.js");
var postJSON = require("./postsJSON.js");
var postsIO = require("./postsIO.js");
var postsTweet = require("./postsTweet.js");
var postsLog = require("./postsLog.js");
var url = 'https://anrweb.vt.gov/DEC/WWInventory/SewageOverflows.aspx';
var post_name = 'posts/reviewed.json';
var alert_name = 'posts/alerts.json';

function updatePosts() {
    try {
        html.loadPosts(url, function(posts, alerts) {
            var data = postJSON.parsePosts(posts);
            var alerts_data = postJSON.parseAlerts(alerts);
            postsIO.savePosts(post_name, data, function(newPosts, err) {
                if(err) throw err;
                if(newPosts && newPosts.posts.length >= 1) {
                    postsTweet.tweet_post(newPosts);
                } 
            });
            postsIO.savePosts(alert_name, alerts_data, function(newAlerts, err) {
                if(err) throw err;
                if(newAlerts && newAlerts.posts.length >= 1) {
                    postsTweet.tweet_alert(newAlerts);
                }
            });
        });
    } catch(err) {
        postsLog.posts_log("Error updating posts: " + err);
    }
}

updatePosts();