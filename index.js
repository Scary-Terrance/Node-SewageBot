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
        // Load the post data into arrays
        html.loadPosts(url, function(posts, alerts) {
            // Parse the data into JSON
            var data = postJSON.parsePosts(posts);
            var alerts_data = postJSON.parseAlerts(alerts);
            // Save the post JSON data and check for new posts
            postsIO.savePosts(post_name, data, function(newPosts, err) {
                if(err) throw err;
                // Tweet the new posts
                if(newPosts && newPosts.posts.length >= 1) {
                    postsTweet.tweet_post(newPosts);
                } 
            });
            // Save the alert JSON data and check for new posts
            postsIO.savePosts(alert_name, alerts_data, function(newAlerts, err) {
                if(err) throw err;
                // Tweet the alerts
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