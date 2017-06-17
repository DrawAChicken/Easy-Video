const filterData = require('./common').parsingVideo;

// module.exports = 
(function (url, cb) {
    filterData(url, (err, $) => {
        if (err) {
            cb(err, null);
            return
        }
        cb(null, $('.playerbox #media').attr('src'))
    })
})('?s=vod-play-id-112440-sid-0-pid-1.html', (err, data) => {
    console.log(err || data)
})

// const fs = require('fs');
// module.exports = function (url, cb) {
//     fs.readFile(__dirname+'/json/homepage.json','utf8', function(err, data) {
//         cb(JSON.parse(data))
//     });
// }