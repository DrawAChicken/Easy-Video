const http=require("http");
const cheerio=require("cheerio");

const url="http://sukantv.cn/"
function filterdata(html) {
    const $=cheerio.load(html);
    let bannerInfo = [];
    let mainInfo = [];
    $('.banner .items').find('li').each((index, item) => {
        bannerInfo.push({
            bannerPic: $(item).attr('style').split("background-image:url('http://sukantv-1253425354.pictj.myqcloud.com")[1].split("')")[0],
            bannerLink: $($('.banner .items').find('a')[index]).attr('href'),
            bannerPicBase: ''
        })
    });
    $('.container .list .push').each((index, item) => {
        const title = $(item).find('.title strong').text();
        let data = [];
        const content = $(item).find('ul li').each((index, item) => {
            data.push({
                short: $(item).find('.img .short').text(),
                link: $(item).find('a').attr('href'),
                pic: $(item).find('.img img').attr('src'),
                name: $(item).find('.info .name').text(),
                score: $(item).find('.info .score').text(),
                starring: $(item).find('.info .actors').text()
            })
        })
        mainInfo.push({
            title,
            data
        })
    })
    return {
        bannerInfo,
        mainInfo
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