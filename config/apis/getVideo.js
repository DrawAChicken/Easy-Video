const http = require("http"); 
const zlib = require('zlib');

function getImg(pic, cb) {
    const options = {
        // http://z.qukansha.com/?s=vod-play-id-65140-sid-0-pid-1.html
        hostname: 'z.qukansha.com',
        port: 80, 
        path: '/?s=vod-play-id-65140-sid-0-pid-1.html',
        method: 'GET',
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            'Cookie':'UM_distinctid=15c90a026a11-0d6cad4f2ec01-574e6e46-3d10d-15c90a026a2109; AJSTAT_ok_pages=4; AJSTAT_ok_times=3; CNZZDATA1260944985=1399641142-1497070589-%7C1497248798',
            'Host':'z.qukansha.com',
            'Pragma':'no-cache',
            'Referer':'http://z.qukansha.com/?s=vod-read-id-65140.html',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    };
    const req = http.request(options, function (res) {
        // res.setEncoding('utf8');
        let chunks = [];
        let size = 0;
        res.on("data", function (chunk) {
            chunks.push(chunk);
            // console.log(chunk.toString('gzip'));            
            size += chunk.length;
        })
        res.on("end", function () {
            const data = Buffer.concat(chunks, size);
             zlib.gunzip(data, function (err, decoded) {
                console.log(decoded.toString());
            });
            // const base64Img = data.toString('base64');
            // cb('data:image/jpg;base64,'+base64Img)
        })
    })
    req.end();
}
getImg()
module.exports = getImg