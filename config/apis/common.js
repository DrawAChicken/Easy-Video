const http=require("http");
const cheerio=require("cheerio");

function crawler(url, callback) {
    let html = '';
    const req = http.get(url, res => {
        const { statusCode } = res;
        if (statusCode !== 200) {
            callback(`请求失败。状态码：${statusCode}`, null);
        }
        res.setTimeout(20000);
        res.on('timeout', () => {
            res.resume();
            callback(`响应超时`, null);
        })
        .on("error", err => {
            res.resume();
            callback(`响应错误${e.message}`, null);
        })
        .on('abort', () => {
            res.resume();
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
        if (req.res) {
            req.res.emit('abort');
        }
        req.abort();
        callback('请求超时', null);
    })
}
module.exports = crawler