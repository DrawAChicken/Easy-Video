const filterData = require('./common');
const URL = require('url');

function parse($) {
    const iframeUrl = $('.playerbox #media').attr('src');
    return {
        type: '1',
        url: iframeUrl
    }
}
module.exports = function (url) {
    url = `http://yinghua.yiyire.cn${url}`
    return new Promise((resolve, reject) => {
        filterData(url)
            .then($ => {
                resolve(parse($));
            })
            .catch(err => {
                reject(err);
            })
    })
}