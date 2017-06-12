const http = require("http"); 

function getImg(pic, cb) {
    const options = {
        hostname: 'sukantv-1253425354.pictj.myqcloud.com',
        port: 80, 
        path: pic,
        method: 'GET',
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            'Pragma':'no-cache',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
    };
    const req = http.request(options, function (res) {
        let chunks = [];
        let size = 0;
        res.on("data", function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
        })
        res.on("end", function () {
            const data = Buffer.concat(chunks, size);
            const base64Img = data.toString('base64');
            cb('data:image/jpg;base64,'+base64Img)
        })
    })
    req.end();
}
module.exports = getImg