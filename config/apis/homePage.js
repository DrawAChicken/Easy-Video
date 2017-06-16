const filterData = require('./common');

module.exports = function (url, cb) {
    filterData(url, (err, $) => {
        if (err) {
            cb(err, null);
            return
        }
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
        cb(null, {
            movieInfo,
            tvSeriesInfo
        })
    })
}

// const fs = require('fs');
// module.exports = function (url, cb) {
//     fs.readFile(__dirname+'/json/homepage.json','utf8', function(err, data) {
//         cb(JSON.parse(data))
//     });
// }