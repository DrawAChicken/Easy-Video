<template>
    <div>
        <webview id="foo" :src="info.url" plugins useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36" httpreferrer="http://yinghua.yiyire.cn/?s=vod-play-id-115143-sid-0-pid-1.html">
        </webview>
        <div class="video-loading" v-if="indicator">
            <div class="box">
                <img src="../../assets/videoloading.gif">
                <p>
                    <span v-for="item in '解析视频资源...'" :key="item" :style="{'animation-delay': setDelay()}">{{item}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: '',
            indicator: false
        };
    },
    watch: {
        $route() {
            this.getInfo();
        }
    },
    methods: {
        setDelay() {
            return `${Math.random()}s`;
        },
        getInfo() {
            this.$remoteApi.getVideo(this.$route.query.url)
                .then(data => {
                    this.info = data;
                })
        }
    },
    mounted() {
        this.getInfo();
        const webview = document.getElementById("foo");
        webview.addEventListener("did-start-loading", () => {
            this.indicator = true;
        });
        webview.addEventListener("did-stop-loading", () => {
            this.indicator = false;
        });
    }
};
</script>

<style lang="scss" scoped>
.main-content {
    width: 100%;
    height: 100%;
    position: relative;
    background: #2b2c30;
    #foo {
        width: 100%;
        height: 100%;
    }
    .video-loading {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #2b2c30;
        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            p {
                text-align: center;
                color: #ccc;
                span {
                    margin: 0 1px;
                    animation: run 2.0s infinite ease-in-out;
                }
            }
        }
    }
    @keyframes run {
        0%,
        100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
}
</style>
