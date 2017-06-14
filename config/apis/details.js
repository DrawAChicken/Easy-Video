const filterData = require('./common');

module.exports = function (url, cb) {
    filterData(url, $ => {
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
        let actors = info.find('.vod-n-l .vw100.clear').find('storng');
        if (actors.length) {
            actors = actors.map(function () {
                return $(this).find('a').text();
            }).toArray()
        }else{
            actors = ['未知']
        }
        let director = info.find('.vod-n-l .vw50.fn-left').find('storng');
        if (director.length) {
            director = director.map(function () {
                return $(this).find('a').text();
            }).toArray()
        }else{
            director = ['未知']
        }
        let type = info.find('.vod-n-l .vw100.fn-left').eq(1).find('a');
        if (type.length) {
            type = type.map(function () {
                return $(this).find('a').text();
            }).toArray()
        }else{
            type = ['未知']
        }
        cb({
            pic: pic.indexOf('/npimg.php?pic=') ? pic : 'http://z.qukansha.com'+pic,
            link: info.find('.vod_play a').attr('href'),
            status:info.find('.vod-n-l .clear.fn-left').text().replace('\r\n', ''),
            name: info.find('.vod-n-l h1').text(),
            actors,
            director,
            type,
            year: info.find('.vod-n-l .vw100').eq(2).text(),
            area: info.find('.vod-n-l .yc a').text(),
            about: $('#con_vod_2 .vod_content').text().replace('\r\n', ''),
            juji
        })
    })
}