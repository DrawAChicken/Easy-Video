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
    })
}