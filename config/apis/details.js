const http=require('http');
const cheerio=require('cheerio');
const fs = require('fs');

function filterdata(html) {
    const $=cheerio.load(html);
    const info = $('#resize_vod');
    const pic = info.find('.vod-l img').attr('data-original');
    let juji = []
    $('.vod-play-info .play-title span').each(function (index) {
        if (index > 0) {
            juji.push({
                title: $(this).find('a').text(),
                data: $('.vod-play-info .play-box').eq(index).find('li').map(function() {
                    return {
                        name: $(this).find('a').attr('href'),
                        link: $(this).find('a').text()
                    }
                })
            })
        }
    }).toArray()
    return {
        pic: pic.indexOf('/npimg.php?pic=') ? pic : 'http://z.qukansha.com'+pic,
        link: info.find('.vod_play a').attr('href'),
        name: info.find('.vod-n-l h1').text(),
        actors: info.find('.vod-n-l .vw100').eq(0).find('storng').map(function () {
            return $(this).find('a').text();
        }).toArray(),
        director: info.find('.vod-n-l .vw50').eq(0).find('a').map(function () {
            return $(this).text()
        }).toArray(),
        type: info.find('.vod-n-l .vw100').eq(1).find('a').map(function () {
            return $(this).text()
        }).toArray(),
        year: info.find('.vod-n-l .vw100').eq(2).text(),
        area: info.find('.vod-n-l .yc a').text(),
        about: $('#con_vod_2 .vod_content').text(),
        juji
    }
}
function crawler(url, cb) {
    // http.get(url, res => {
    //     var html="";
    //     res.on("data", data => {
    //         html+=data
    //     });
    //     res.on("end", () => {
    //         cb(filterdata(html));
    //     })
    // });
    fs.readFile(__dirname+'info.json', 'utf8', (err, data) => {
        cb(data);
    });
}
module.exports = crawler