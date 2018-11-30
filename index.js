const rp = require('request-promise');
const cheerio = require('cheerio');
var url = 'https://anrweb.vt.gov/DEC/WWInventory/SewageOverflows.aspx';

rp(url)
    .then(function (html) {
        // Proccess the HTML
        const $ = cheerio.load(html);
        // Load the headers reviewed by the DEC Wastewater Staff
        var reviewed_headers = [];
        $("#body_GridViewSewageOverflowsAuthorized .dataList_header th a").each(function(i, elem) {
            headers[i] = $(this).text();
            console.log($(this).text());
        });
    })
    .catch(function (err) {
        // Crawling failed...
        console.log("Error Accessing webpage: " + err);
    });