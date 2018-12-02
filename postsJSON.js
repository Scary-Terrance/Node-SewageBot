// Clean up posts with missing data points
function check_forData(post, index) {
    var data = "";
    this_post = post[index];

    // Clean the data
    clean_post = this_post.replace(String.fromCharCode(160), " ");
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
//" "" "
//  Parse the posts into JSON data and return
exports.parsePosts = function(posts) {
    var obj_data = {};
    var key = 'reviewed_posts';
    obj_data[key] = [];
    for(var i = 0; i < posts.length; i++) {
        var data = {
            start_date: check_forData(posts[i], 1),
            end_date: check_forData(posts[i], 2),
            time_frame: check_forData(posts[i], 3),
            city: check_forData(posts[i], 4),
            location: check_forData(posts[i], 5),
            watershed: check_forData(posts[i], 6),
            type: check_forData(posts[i], 7),
            amount: check_forData(posts[i], 8),
            facility: check_forData(posts[i], 9),
            contact: check_forData(posts[i], 10),
            id: check_forData(posts[i], 11)
        };
        obj_data[key].push(data);    
    }
    console.log("Finished parsing");
    return JSON.stringify(obj_data);
};