const http=require("http");
const cheerio=require("cheerio");

const url="http://z.qukansha.com/"
function filterdata(html) {
    const $=cheerio.load(html);
    let movieInfo = [];
    let tvSeriesInfo = [];
    $('.main').each(function (index) {
        const list = $(this).find('.list_tab_img').eq(0).find('li');
        list.each(function () {
            let pic = $(this).find('img').attr('data-original');
            const info = {
                link: $(this).find('a').attr('href'),
                pic: pic.indexOf('/npimg.php?pic=') ? pic : 'http://z.qukansha.com'+pic,
                name: $(this).find('.name').text() || $(this).find('h2 a').text(),
                title: $(this).find('.title').text(),
                score: $(this).find('.score').text(),
                status: $(this).find('.status') === true,
                starring: $(this).find('p').text()
            };
            if(index === 0){
                movieInfo.push(info);
            }
            else{
                tvSeriesInfo.push(info);
            }
        })
    })
    return {
        movieInfo,
        tvSeriesInfo
    }
}
function crawler(cb) {
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