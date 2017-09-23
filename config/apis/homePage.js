const filterData = require('./common');
const PicPath = require('../utils/filterPicPath');

function parse($) {
    let movieInfo = [];
    let tvSeriesInfo = [];
    $('.main').each(function (index) {
        const list = $(this).find('.list_tab_img').eq(0).find('li');
        list.each(function () {
            let pic = $(this).find('img').attr('data-original');
            const info = {
                link: $(this).find('a').attr('href'),
                pic: PicPath(pic),
                name: $(this).find('.name').text() || $(this).find('h2 a').text(),
                title: $(this).find('.title').text(),
                score: $(this).find('.score').text(),
                status: $(this).find('.status') === true,
                starring: $(this).find('p').text()
            };
            if (index === 0) {
                movieInfo.push(info);
            }
            else {
                tvSeriesInfo.push(info);
            }
        })
    })
    return {
        movieInfo,
        tvSeriesInfo
    };
}
module.exports = function (url) {
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