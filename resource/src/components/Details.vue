<template>
    <div class="box">
        <div class="bg" :style="{'background-image': `url(${info.pic})`}"></div>
        <div class="board">
            <!--<webview id="ad" src="http://jiexi.fuquanjie.cn/playm3u8/?type=pptvyun&vid=bf8a39b7e42fae8f52ac1e5a2d44fb40" useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" plugins></webview>-->
            <div class="pic">
                <img :src="info.pic" alt="">
                <em class="play-icon" @click="goPlay()"></em>
                <!--<ul class="blues" v-if="info.juji" >
                    <li v-for="item in info.juji">{{item}}</li>
                </ul>-->
            </div>
            <div class="video-info">
                <p class="name">{{info.name}}</p>
                <p class="actors">
                    <span class="left">状态 :</span>
                    <span class="actor">{{info.status}}</span>
                </p>
                <p class="actors">
                    <span class="left">导演 :</span>
                    <span v-for="item in info.director" class="actor">{{item}}</span>
                </p>
                <p class="actors">
                    <span class="left">类型 :</span>
                    <span v-for="item in info.type" class="actor">{{item}}</span>
                </p>
                <p class="actors">
                    <span class="left">演员 :</span>
                    <span v-for="(item, index) in info.actors" class="actor">{{item}}<i v-if="index != info.actors.length-1">、</i></span>
                </p>
                <p class="actors">
                    <span class="left">地区 :</span>
                    <span class="actor">{{info.area}}</span>
                </p>
                <p class="year">
                    <span class="left">更新 :</span>
                    <span>{{info.year}}</span>
                </p>
                <p class="actors">
                    <span class="left">简介 :</span>
                    <span class="actor">{{info.about || '暂无'}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {}
        };
    },
    methods: {
        goPlay() {
            console.log(1);
        }
    },
    created() {
        this.$remoteApi.details(`http://z.qukansha.com${this.$route.query.url}`, data => {
            const status = data.status.split('：');
            if (status[0] === '清晰') {
                data.status = '完结'
            }
            if (status[0] === '状态') {
                data.status = status[1]
            }
            if (!data.type.length) {
                data.type = ['未知']
            }
            if (!data.year.indexOf('更新')) {
                data.year = data.year.split('：')[1]
            }
            this.$set(this, 'info', data);
		})
    },
    mounted() {
        // const q = document.getElementById("ad");
        // q.addEventListener('did-get-response-details', function (e) {
        //     // webview.insertText('text');
        //     // q.openDevTools()
        //     // console.log(e);
        //     // const requestId = webview.findInPage('video')
        //     // console.log(requestId)
        //     // webview.contentWindow.document.getElementById("myVideo");
        //     // console.log(webview.contentWindow)
        // });
        // webview.addEventListener('found-in-page', (e) => {
        //     console.log(e)            
        //     console.log(e.target.dataset.constructor('li'))
        //     webview.stopFindInPage('keepSelection')
        // })
        
    }
};
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        height: 100%;
        position: relative;
        background: rgba(0, 150, 255, 0.16);
        .bg{
            width: 100%;
            height: 100%;
            filter:blur(30px);
            background-size: cover;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            left: 0;
        }
        .board{
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(0,0,0,0.2);
            top: 0;
            left: 0;
            .pic{
                width: 35%;
                height: 80%;
                position: absolute;
                top: 10%;
                left: 10%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
                .play-icon{
                    position: absolute;
                    top:0;
                    left:0;
                    right: 0;
                    bottom:0;
                    margin: auto;
                    width: 100px;
                    height: 100px;
                    display: block;
                    opacity: 0;
                    position: absolute;
                    transition: all .5s;
                    background: url('../assets/play.png');      
                    background-size: 100%;
                }
                &:hover .play-icon{
                    opacity: 1;
                }
            }
            .video-info{
                padding: 10px;
                width: 40%;
                position: absolute;
                top: 10%;
                right: 10%;
                font-size: 13px;
                color: #111;
                min-height: 80%;
                background: rgba(245,245,245,0.16);
                border-radius: 4px;
                p{
                    overflow: hidden;
                    position: relative;
                    padding-left: 40px;
                }
                .name{
                    font-size: 30px;
                    line-height: 30px;
                    margin-bottom: 10px;
                    padding:0;
                }
                span{
                    float: left;
                    line-height: 20px;
                }
                .actor{
                    padding: 0 2px;
                }
                .left{
                    width: 40px;
                    color:#111;
                    text-align: center;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
</style>
