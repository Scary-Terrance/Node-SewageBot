// Clean up posts with missing data points
function check_forData(post, index) {
    var data = "";
    this_post = post[index];

    // Clean the data
    clean_post = this_post.replace(String.fromCharCode(160), " ");
    clean_post = this_post.replace("\n", " ");
    clean_post = clean_post.trim();

    // Make sure empty characters are set as ""
    if(clean_post === " " || clean_post === "" || clean_post == null || clean_post.charCodeAt(0) == 160) {
        data = "";
    }
    else if(clean_post != null) {
        data = clean_post;
    }
    return data;
}

//  Parse the posts into JSON data and return
exports.parsePosts = function(in_posts) {
    var obj_data = {};
    var posts = [];
    obj_data.posts = posts;
    // Iterate through the array and parse it into JSON
    for(var i = 0; i < in_posts.length; i++) {
        var data = {
            start_date:     check_forData(in_posts[i], 1),
            end_date:       check_forData(in_posts[i], 2),
            time_frame:     check_forData(in_posts[i], 3),
            city:           check_forData(in_posts[i], 4),
            location:       check_forData(in_posts[i], 5),
            watershed:      check_forData(in_posts[i], 6),
            type:           check_forData(in_posts[i], 7),
            amount:         check_forData(in_posts[i], 8),
            facility:       check_forData(in_posts[i], 9),
            contact:        check_forData(in_posts[i], 10),
            sub_num:        check_forData(in_posts[i], 11),
            id:             check_forData(in_posts[i], 12)
        };
        obj_data.posts.push(data);    
    }
    console.log("Finished parsing posts");
    return obj_data;
};

// Parse alerts into JSON and return
exports.parseAlerts = function(in_posts) {
    var obj_data = {};
    var posts = [];
    obj_data.posts = posts;
    // Iterate through the array and parse it to JSON
    for(var i = 0; i < in_posts.length; i++) {
        var data = {
            facility:       check_forData(in_posts[i], 0),
            city:           check_forData(in_posts[i], 1),
            description:    check_forData(in_posts[i], 2),
            watershed:      check_forData(in_posts[i], 3),
            time:           check_forData(in_posts[i], 4),
            id:             check_forData(in_posts[i], 5)    
        };
        obj_data.posts.push(data);    
    }
    console.log("Finished parsing alerts");
    return obj_data;
}; 