const http=require("http");
const cheerio=require("cheerio");

function filterdata(html) {
    const $=cheerio.load(html);
    const info = $('.main .board .info ul');
    let juji = $('.detail .juji li').map(function () {
            return $(this).find('a').text();
        }).toArray()
    juji = juji.length ? juji : null;
    return {
        pic: $('.main .board .pic img').attr('src').split('_220')[0],
        // amountPlay: $('.main .board .pic .view em').text(),
        name: info.find('.name h1').text(),
        score: info.find('.score em').text(),
        actors: info.find('.actors a').map(function () {
            return $(this).text();
        }).toArray(),
        director: info.find('.director em').eq(1).text(),
        type: info.find('.class a').map(function () {
            return $(this).text();
        }).toArray(),
        year: info.find('.year em').eq(1).text(),
        area: info.find('.area a').text(),
        length: info.find('.length em').eq(1).text(),
        dsp: info.find('.dsp em').eq(1).text(),
        juji
    }
}
function crawler(url, cb) {
    http.get(url, res => {
        var html="";
        res.on("data", data => {
            html+=data
        });
        res.on("end", () => {
            cb(filterdata(html));
        })
    });
}
module.exports = crawler