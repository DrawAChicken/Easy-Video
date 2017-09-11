const filterData = require('./common').parsingVideo;
const URL = require('url');

module.exports = function (path, cb) {
    const URLOptions = {
        hostname: 'yinghua.yiyire.cn',
        path
    }
    filterData(URLOptions, (err, $) => {
        if (err) {
            cb(err, null);
            return
        }
        const iframeUrl = $('.playerbox #media').attr('src');
        cb(null, {
            type: '1',
            url: iframeUrl
        })
        // const {hostname, path} = URL.parse(iframeUrl);
        // if (hostname === 'jiexi.fuquanjie.cn') {
        //     cb(null, {
        //         type: '1',
        //         url: iframeUrl
        //     })
        //     return
        // }
        // filterData({
        //     hostname,
        //     path
        // }, (err, $) => {
        //     if (err) {
        //         cb(err, null);
        //         return
        //     }
        //     cb(null, {
        //         type: '2',
        //         url: $('[name=mp4url]').attr('value')
        //     })
        // })
    })
}
// )('?s=vod-play-id-112440-sid-0-pid-1.html', (err, data) => {
//     console.log(err || data)
// })

// const fs = require('fs');
// module.exports = function (url, cb) {
//     fs.readFile(__dirname+'/json/homepage.json','utf8', function(err, data) {
//         cb(JSON.parse(data))
//     });
// }