const rp = require('request-promise');
const cheerio = require('cheerio');

exports.loadPosts = function(url, callback) {
    rp(url).then(function (html) {
        // Process the HTML
        const $ = cheerio.load(html);

        // Load the headers reviewed by the DEC Wastewater Staff
        var reviewed_headers = [];
        $("#body_GridViewSewageOverflowsAuthorized .dataList_header th a").each(function(i, elem) {
            reviewed_headers[i] = $(this).text();
        });

        var posts = [];
        // Load the Posts from the Other category
        $("#body_GridViewSewageOverflowsOther tbody tr").each(function(row, elem) {
            // Skip the header and footer
            if(!$(this).hasClass("dataList_header") && !$(this).hasClass("dataList_footer")) {
                var items = [];
                $(this).find("td").each(function(col, elem) {
                    items.push($(this).text());
                });
                posts[row-1] = items.slice();
            }
        });
        var other_length = posts.length; // Load the length so we can add the regular posts onto our other_posts
        // Load the Posts reviewed by the DEC Wastewater Staff
        $("#body_GridViewSewageOverflowsAuthorized tbody tr").each(function(row, elem) {
            // Skip the header and footer
            if(!$(this).hasClass("dataList_header") && !$(this).hasClass("dataList_footer")) {
                var items = [];
                $(this).find("td").each(function(col, elem) {
                        items.push(($(this).text()));
                });
                posts[(other_length - 1) + (row-1)] = items.slice(); // row-1 because we skip the first item .dataList_header
            }
        });
        console.log("Successfully loaded posts");
        callback(posts);
    })
    .catch(function (err) {
        // Crawling failed...
        console.log("Error Parsing Webpage: " + err);
    });
};