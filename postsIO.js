var fs = require('fs');

function newPosts(posts, filename, callback) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        if(data) {
            data = JSON.parse(data);
            new_posts = {};
            var key = 'reviewed_posts';
            new_posts[key] = [];
            save_posts = {};
            var key = 'reviewed_posts';
            save_posts[key] = [];
            // Find any new posts
            for(var x = 0; x < posts.reviewed_posts.length; x++) {
                var match = true;
                for(var y = 0; y < data.reviewed_posts.length; x++) {
                    if(posts[y] && data[x]) {
                        if(posts[y].id != data[x].id) {
                            match = false;
                        }
                    }
                }
                if(!match) {
                    save_posts[key].push(posts[y]);
                    new_posts[key].push(posts[y]);
                }
                else {
                    
                }
            }
            // Return the callback
            callback(new_posts, save_posts, err);
        }
        else {
            callback(null, posts, err);
        }
    }); 
}

function saveJSON(data, filename, callback) {
    fs.writeFile(filename, data, 'utf-8', function(err, data){
        callback(err);
    });
}

exports.savePosts = function(filename, posts, callback) {
    newPosts(posts, filename, function(newPosts, save_posts, err) {
        if(save_posts != null) {
            saveJSON(JSON.stringify(save_posts), filename, function() {
                callback(newPosts, err);
            });
        }
        else {
            callback(newPosts, err);
        }
    });
};