const http = require("http");
const cheerio = require("cheerio");

module.exports = function (url) {
    return new Promise((resolve, reject) => {
        let html = '';
        const req = http.get(url, res => {
            const { statusCode } = res;
            if (statusCode !== 200 && statusCode !== 302) {
                reject(`请求失败。状态码：${statusCode}`);
            }
            res.setTimeout(20000);
            res.on('timeout', () => {
                reject('响应超时')
            }).on("error", err => {
                reject(`响应错误${e.message}`);
            }).on("data", data => {
                html += data;
            }).on("end", () => {
                resolve(cheerio.load(html));
            })
        });
        req.setTimeout(20000);
        req.on('error', err => {
            reject(`请求错误${err.message}`);
        })
        req.on('timeout', () => {
            req.abort();
            reject('请求超时');
        })
    })
}