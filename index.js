// Imports
var html = require("./postLoad.js");
var postJSON = require("./postsJSON.js");
var postsIO = require("./postsIO.js");
var url = 'https://anrweb.vt.gov/DEC/WWInventory/SewageOverflows.aspx';
var postname = 'posts/reviewed.json';
var alertname = 'posts/alerts.json';

function runServer() {
    html.loadPosts(url, function(posts, alerts) {
        var data = postJSON.parsePosts(posts);
        var alerts_data = postJSON.parseAlerts(alerts);
        postsIO.savePosts(postname, data, function(newPosts, err) {
            if(err) throw err;
            if(newPosts && newPosts.posts.length >= 1) {
                console.log("Success posts, post to Twitter");
            } 
        });
        postsIO.savePosts(alertname, alerts_data, function(newAlerts, err) {
            if(err) throw err;
            if(newAlerts && newAlerts.posts.length >= 1) {
                console.log("Success alerts, post to Twitter");
            }
        });
    })
}

runServer();