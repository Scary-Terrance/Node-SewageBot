var fs = require('fs');

// Finds new posts added to the site and makes a new save object to update file
function newPosts(in_posts, filename, callback) {
    fs.readFile(filename, 'utf-8', function(err, input) {
        // JSON object to be saved in the save file
        var save_posts = {};
        var saved_posts = [];
        save_posts.saved_posts = saved_posts;
        if(input) {
            // Concert the data to JSON
            var data = JSON.parse(input);
            // Json object for holding new posts to be tweeted
            var new_posts = {};
            var posts = [];
            new_posts.posts = posts;
            // Find any new posts by comparing the JSON objects
            in_posts.posts.forEach(function(post) {
                var match = false;
                data.saved_posts.forEach(function(data_post) {
                    if(post && data_post) {
                        if(post.id == data_post.id) {
                            // New post found add it to new_posts
                            match = true;
                        }
                    }
                });
                // Every post in the JSON object needs to be saved
                save_posts.saved_posts.push(post);
                // New posts to be Tweeted
                if(!match) {
                    new_posts.posts.push(post);
                }
            });
            // Return the callback
            callback(new_posts, save_posts, err);
        }
        else {
            // No data saved, make a new JSON object for saving from the in_posts
            in_posts.posts.forEach(function(post) {
                save_posts.saved_posts.push(post);
            });
            callback(in_posts, save_posts, err);
        }
    });
}

// Update the file with new JSON data
function saveJSON(data, filename, callback) {
    fs.writeFile(filename, data, 'utf-8', function(err, data) {
        if(err) throw err;
        callback(err);
    });
}

// Checks for new posts and updates the save file
exports.savePosts = function(filename, posts, callback) {
    newPosts(posts, filename, function(newPosts, save_posts, err) {
        // New posts
        if(newPosts && newPosts.posts.length >= 1) {
            saveJSON(JSON.stringify(save_posts), filename, function(err) {
                console.log('Finished saving ' + filename + ', new posts to Tweet');
                callback(newPosts, err);
            });
        }
        // No new posts
        else {
            saveJSON(JSON.stringify(save_posts), filename, function(err) {
                console.log('Finished saving ' + filename + ', no posts to Tweet');
                callback(null, err);
            });
        }
    });
};