// Imports
var html = require("./postLoad.js");
var postJSON = require("./postsJSON.js");
var postsIO = require("./postsIO.js");
var url = 'https://anrweb.vt.gov/DEC/WWInventory/SewageOverflows.aspx';
var filename = 'posts/reviewed.json';

function runServer() {
    html.loadPosts(url, function(posts) {
        var data = postJSON.parsePosts(posts);
        postsIO.savePosts(filename, data, function(newPosts, err) {
            if(err) throw err;
        });
    });
}

runServer();