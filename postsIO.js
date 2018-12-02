var fs = require('fs');

function newPosts(posts, filename, callback) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        if(data) {
            data = JSON.parse(data);
            new_posts = {};
            var key = 'reviewed_posts';
            new_posts[key] = [];
            // Find any new posts
            for(var x = 0; x < data.reviewed_posts.length; x++) {
                var match = true;
                for(var y = 0; y < posts.reviewed_posts.length; x++) {
                    if(posts.Reviewed[y] && data[x]) {
                        if(posts[y].id != data[x].id) {
                            match = false;
                        }
                    }
                    else {
                        console.log();
                    }
                }
                if(!match) {
                    new_posts[key].push(posts[y]);
                }
            }
            // Return the callback
            callback(new_posts, err);
        }
        else {
            callback(posts, err);
        }
    }); 
}

function saveJSON(data, filename, callback) {
    var ws = fs.createWriteStream(filename);
    ws.on('open', function(){
        ws.write(data);
        callback();
    });
}

exports.savePosts = function(filename, posts, callback) {
    newPosts(posts, filename, function(newPosts, err) {
        if(newPosts != null) {
            saveJSON(JSON.stringify(newPosts), filename, function() {
                callback(newPosts, err);
            });
        }
        else {
            callback(null, err);
        }
    });
};