const http=require("http");
const cheerio=require("cheerio");

function crawler(url, cb) {
    http.get(url, res => {
        var html="";
        res.on("data", data => {
            html+=data
        });
        res.on("end", () => {
            cb(cheerio.load(html));
        })
    });
}
module.exports = crawler