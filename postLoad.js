const rp = require('request-promise');
const cheerio = require('cheerio');

exports.loadPosts = function(url, callback) {
    rp(url).then(function (html) {
        // Process the HTML
        const $ = cheerio.load(html);

        var posts = [];
        // Load the Posts from the Other category
        $("#body_GridViewSewageOverflowsOther tbody tr").each(function(row, elem) {
            // Skip the header and footer
            if(!$(this).hasClass("dataList_header") && !$(this).hasClass("dataList_footer")) {
                var items = [];
                $(this).find("td").each(function(col, elem) {
                    items.push($(this).text());
                });
                posts.push(items.slice());
            }
        });
        
        // Load the Posts reviewed by the DEC Wastewater Staff
        $("#body_GridViewSewageOverflowsAuthorized tbody tr").each(function(row, elem) {
            // Skip the header and footer
            if(!$(this).hasClass("dataList_header") && !$(this).hasClass("dataList_footer")) {
                var items = [];
                $(this).find("td").each(function(col, elem) {
                        items.push(($(this).text()));
                });
                posts.push(items.slice()); // row-1 because we skip the first item .dataList_header
            }
        });

        // Load the alerts into a different array
        var alerts = [];
        $("#body_GridViewPublicAlerts tbody tr").each(function(row, elem) {
            // Skip the header and footer
            if(!$(this).hasClass("dataList_header") && !$(this).hasClass("dataList_footer")) {
                var items = [];
                $(this).find("td").each(function(col, elem) {
                    items.push(($(this).text()));
                });
                alerts.push(items.slice());
            }
        });

        console.log("Successfully loaded posts");
        callback(posts, alerts);
    })
    .catch(function (err) {
        // Crawling failed...
        console.log("Error Parsing Webpage: " + err);
    });
};