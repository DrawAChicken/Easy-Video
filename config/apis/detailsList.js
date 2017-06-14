const filterData = require('./common');

module.exports =function (url, cb) {
    filterData(url, $ => {
        const lists = $('.main.top');
        const filterBar = $(lists[0]).find('.list_ico a').map(function () {
            return {
                name: $(this).text(),
                link: $(this).attr('href')
            }
        }).toArray();
        const list = lists[1].find('#vod_list li').map(function () {
            return {
                name: $(this).find('h2 a').text(),
                link: $(this).find('a').attr('href'),
                pic: $(this).find('img').attr('data-original'),
                score: $(this).find('.score').text(),
                title: $(this).find('.title').text(),
                region: $(this).find('p').text()
            }
        }).toArray();
        cb({
            filterBar,
            list
        })
    })
}