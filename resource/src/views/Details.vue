<template>
    <div class="box">
        <div class="bg" :style="stylePic"></div>
        <div class="board">
                         'http://jiexi.fuquanjie.cn/playm3u8/?type=pptvyun&vid=1b66cca4fed0945baeddd80de4bc43ac'
            <webview src="http://jiexi.fuquanjie.cn/playm3u8/?type=pptvyun&vid=bf8a39b7e42fae8f52ac1e5a2d44fb40" useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" plugins></webview>
            <div class="pic">
                <img :src="picBase" alt="">
                <em class="play-icon" @click="goPlay()"></em>
                <ul class="blues" v-if="info.juji" >
                    <li v-for="item in info.juji">{{item}}</li>
                </ul>
            </div>
            <div class="video-info">
                <p class="name">{{info.name}} <span class="score">评分: {{info.score}}</span></p>
                <p class="actors">
                    <span class="left">演员 :</span>
                    <span v-for="item in info.actors" class="actor">{{item}}</span>
                </p>
                <p class="length">
                    <span class="left">时长 :</span>
                    <span>{{info.length}}</span>
                </p>
                <p class="year">
                    <span class="left">上映时间 :</span>
                    <span>{{info.year}}</span>
                </p>
                <p class="dsp">{{info.dsp}}</p>                
                <!--<p class="director">{{info.director}}</p>
                <p class="area">{{info.area}}</p>-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {},
            picBase: ''
        };
    },
    methods: {
        goPlay() {
            console.log(1);
        }
    },
    computed: {
        stylePic() {
            return `background-image: url('${this.picBase}')`
        }
    },
    created() {
        this.$remoteApi.details(this.$route.query.url, data => {
            this.$set(this, 'info', data);
			console.log(this.info);
            this.$remoteApi.getImg(data.pic, item => {
                this.$set(this, 'picBase', item)
            })
		})
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
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            left: 0;
        }
        .board{
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(255,255,255,0.2);
            top: 0;
            left: 0;
            .pic{
                width: 35%;
                position: absolute;
                top: 10%;
                left: 10%;
                img{
                    width: 100%;
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
                .blues{
                    padding: 5px 0;
                    overflow: auto;
                    height: 100px;
                    li{
                        margin: 2px 2px;
                        width: 40px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        border-bottom: 1px solid #333;
                        color: #333;
                        float: left;
                        font-size: 12px;
                        &:hover{
                            border-bottom: 1px solid #ff722c;
                            color: #ff722c;
                        }
                    }
                }
                &:hover .play-icon{
                    opacity: 1;
                }
            }
            
            
            .video-info{
                padding: 10px 0;
                width: 40%;
                // height: 300px;
                position: absolute;
                top: 10%;
                right: 10%;
                font-size: 13px;
                color: #111;
                p{
                    overflow: hidden;
                }
                .name{
                    font-size: 20px;
                    line-height: 30px;
                    margin-bottom: 10px;
                    .score{
                        float: right;
                        font-size: 12px;
                        color: #ff722c
                    }
                }
                span{
                    float: left;
                    line-height: 20px;                    
                }
                .actor{
                    padding: 0 2px;
                }
                .left{
                    width: 60px;
                    color:#4a4a4a;
                    text-align: right;
                    margin-right: 10px;
                }
                .dsp{
                    margin-top: 5px;
                    text-indent: 15px;
                    line-height: 20px;
                }
            }
        }
    }
</style>
