var fs = require('fs');

function generate_file_date() {
    var date = new Date().toLocaleDateString("en-US", {timeZone: "America/New_York"}); 
    var filename = date.replace("/", "_");
    filename = filename.replace("/", "_");
    filename += ".txt";
    var file = "logs/" + filename;
    return file;
}

function check_file(filename) {
    if(!fs.existsSync(filename)) {
        fs.closeSync(fs.openSync(filename, 'w'));
    }
}

function append_log(filename, data) {
    var logStream = fs.createWriteStream(filename, {'flags': 'a'});
    logStream.write(data);
    logStream.end('\n');
}

exports.posts_log = function(data) {
    // Load the current time
    var time = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    var log = time + ": " + data;
    filename = generate_file_date();
    check_file(filename);
    append_log(filename, log);
};
