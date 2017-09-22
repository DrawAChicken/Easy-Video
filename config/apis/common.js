const http=require("http");
const cheerio=require("cheerio");
const zlib = require('zlib');


function parsingHTML(url, callback) {
    let html = '';
    const req = http.get(url, res => {
        const { statusCode } = res;
        if (statusCode !== 200 && statusCode !== 302) {
            callback(`请求失败。状态码：${statusCode}`, null);
        }
        res.setTimeout(20000);
        res.on('timeout', () => {
            res.resume();
            callback(`响应超时`, null);
        })
        .on("error", err => {
            callback(`响应错误${e.message}`, null);
        })
        .on("data", data => {
            html += data;
        })
        .on("end", () => {
            callback(null, cheerio.load(html));
        })
    });
    req.setTimeout(20000);
    req.on('error', err => {
         callback(`请求错误${err.message}`, null);
    })
    req.on('timeout', () => {
        req.abort();
        callback('请求超时', null);
    })
}
function parsingVideo(url, callback) {
    const options = {
        hostname: url.hostname,
        port: 80,
        path: url.path,
        headers: {
            'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    };
    const req = http.get(options, res => {
        let chunks = '';
        let size = 0;
        res.on("data", chunk => {
            chunks += chunk
        })
        res.on("end", () => {
            callback(null, cheerio.load(chunks));
        })
    })
}
module.exports = {
    parsingHTML,
    parsingVideo
}