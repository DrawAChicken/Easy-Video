const filterData = require('./common');
const PicPath = require('../utils/filterPicPath');

function parse($) {
    const lists = $('.main.top');
    const typeList = [];
    const totalNumber = $('.ui-vpages strong').text();
    $('.list-nav .list-fen .selectList li').each(function (item, index) {
        const cl = $(this).find('a').map(function () {
            return {
                className: $(this).attr('class'),
                name: $(this).text(),
                link: $(this).attr('href')
            };
        }).toArray();
        typeList.push(cl);
    });
    const filterBar = $(lists).eq(0).find('.list_ico a').map(function () {
        return {
            name: $(this).text(),
            link: $(this).attr('href')
        };
    }).toArray();
    const list = $(lists).eq(1).find('#vod_list li').map(function () {
        const pic = $(this).find('img').attr('data-original');
        return {
            name: $(this).find('h2 a').text(),
            link: $(this).find('a').attr('href'),
            pic: PicPath(pic),
            score: $(this).find('.score').text(),
            title: $(this).find('.title').text(),
            region: $(this).find('p').text()
        };
    }).toArray();
    return {
        pagination: {
            totalNumber
        },
        typeList,
        filterBar,
        list
    }
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