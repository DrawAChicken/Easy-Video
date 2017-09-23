const filterData = require('./common');
const PicPath = require('../utils/filterPicPath');

function parse($) {
    const typeList = [];
    const mainList = [];
    $('.channel-m.main .channel-list-l').each(function () {
        const list = $(this).find('ul a').map(function () {
            return {
                name: $(this).text(),
                link: $(this).attr('href')
            };
        }).toArray();
        typeList.push({
            title: $(this).find('h3').text(),
            list
        });
    });
    $('.modo_title.top').each(function () {
        const imgList = $(this).next().find('#resize_list li').map(function () {
            const pic = $(this).find('img').attr('data-original')
            return {
                link: $(this).find('a').attr('href'),
                pic: PicPath(pic),
                name: $(this).find('a').attr('title'),
                title: $(this).find('.title').text(),
                score: $(this).find('.score').text()
            }
        }).toArray();
        const textList = $(this).next().find('.list-txt li').map(function () {
            return {
                link: $(this).find('a').attr('href'),
                name: $(this).find('a').text(),
                subName: $(this).find('span').text()
            }
        }).toArray();
        mainList.push({
            title: $(this).find('h2 a').text(),
            link: $(this).find('h2 a').attr('href'),
            imgList,
            textList
        })
    })
    return {
        typeList,
        mainList
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