const http=require("http");
const cheerio=require("cheerio");
const zlib = require('zlib');


function parsingHTML(url, callback) {
    let html = '';
    const req = http.get(url, res => {
        const { statusCode } = res;
        if (statusCode !== 200) {
            callback(`请求失败。状态码：${statusCode}`, null);
        }
        res.setTimeout(20000);
        res.on('timeout', () => {
            res.resume();
            callback(`响应超时`, null);
        })
        .on("error", err => {
            res.resume();
            callback(`响应错误${e.message}`, null);
        })
        .on('abort', () => {
            res.resume();
        })
        .on("data", data => {
            html += data;
        })
        .on("end", () => {
            callback(null, cheerio.load(html));
        })
    });
    req.setTimeout(20000);
    req.on('error', err => {
         callback(`请求错误${err.message}`, null);
    })
    req.on('timeout', () => {
        if (req.res) {
            req.res.emit('abort');
        }
        req.abort();
        callback('请求超时', null);
    })
}
function parsingVideo(url, callback) {
    const options = {
        // http://z.qukansha.com/?s=vod-play-id-65140-sid-0-pid-1.html
        hostname: 'z.qukansha.com',
        port: 80, 
        path: '/?s=vod-play-id-112440-sid-0-pid-1.html',
        headers: {
            // 'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            // 'Accept-Encoding':'gzip, deflate, sdch',
            // 'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
            // 'Cache-Control':'no-cache',
            // 'Connection':'keep-alive',
            // // 'Cookie':'UM_distinctid=15c90a026a11-0d6cad4f2ec01-574e6e46-3d10d-15c90a026a2109; AJSTAT_ok_times=7; CNZZDATA1260944985=1399641142-1497070589-%7C1497632225',
            // 'Host':'z.qukansha.com',
            // 'Pragma':'no-cache',
            // // 'Referer':'http://z.qukansha.com/?s=vod-play-id-112440-sid-0-pid-1.html',
            // 'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    };
    const req = http.get(options, res => {
        let chunks = '';
        let size = 0;
        console.log(res.statusCode)
        res.on("data", chunk => {
            chunks += chunk
            // chunks.push(chunk);
            // size += chunk.length;
        })
        res.on("end", () => {
            console.log(chunks)
            // const data = Buffer.concat(chunks, size);
            // zlib.gunzip(data, function (err, decoded) {
            //     if (err) {
            //         callback(`解压错误${err}`, null)
            //     }
            //     const $ = cheerio.load(decoded.toString());
            //     console.log(decoded.toString())
            //     callback(null, $)
            // });
        })
    })
    // req.end();
}
module.exports = {
    parsingHTML, 
    parsingVideo
}