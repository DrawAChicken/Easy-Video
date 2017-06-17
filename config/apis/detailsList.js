const filterData = require('./common').parsingHTML;

module.exports = function (url, cb) {
    filterData(url, (err, $) => {
        if (err) {
            cb(err, null);
            return
        }
        const lists = $('.main.top');
        const typeList =[];
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
                pic: pic.indexOf('/npimg.php?pic=') ? pic : 'http://z.qukansha.com'+pic,
                score: $(this).find('.score').text(),
                title: $(this).find('.title').text(),
                region: $(this).find('p').text()
            };
        }).toArray();
        cb(null, {
            pagination:{
                totalNumber
            },
            typeList,
            filterBar,
            list
        })
    })
}

// const fs = require('fs');
// module.exports = function (flg, cb) {
//     fs.readFile(__dirname+'', 'utf8', function(err, data) {
//         cb(JSON.parse(data))
//     });
// }