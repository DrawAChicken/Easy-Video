const http = require("http"); 

function getImg(pic, cb) {
    const options = {
        hostname: 'jiexi.fuquanjie.cn',
        port: 80, 
        path: '/playm3u8/?type=pptvyun&vid=bf8a39b7e42fae8f52ac1e5a2d44fb40',
        method: 'GET',
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            'Cookie':'PHPSESSID=vtsf4m83b0u220ta2ecgogc342',
            'Host':'jiexi.fuquanjie.cn',
            'Pragma':'no-cache',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    };
    const req = http.request(options, function (res) {
        let chunks = [];
        let size = 0;
        res.on("data", function (chunk) {
            chunks.push(chunk);
            console.log(chunk.toString());            
            size += chunk.length;
        })
        res.on("end", function () {
            const data = Buffer.concat(chunks, size);
            // const base64Img = data.toString('base64');
            // cb('data:image/jpg;base64,'+base64Img)
        })
    })
    req.end();
}
getImg()
module.exports = getImg