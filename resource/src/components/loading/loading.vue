<template>
    <div class="loading">
        <div class="spinner-err" v-if="apiError">
            <img src="../../assets/error.png" alt="">
            <p class="button">
                <em>数据加载失败</em>
                <em>{{errMsg || "网络或服务器延迟，请稍后再试"}}</em>
                <el-button size="small" @click="refresh">刷新<i class="el-icon-setting el-icon--right"></i></el-button>
            </p>
        </div>
        <div class="spinner" v-else>
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
            <p class="text">
                <span v-for="item in text" :style="{'animation-delay': setDelay()}"> {{item}} </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: 'loading...'
        },
        apiError: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            text: []
        };
    },
    created() {
        this.text = this.message.split('');
    },
    computed: {
        errMsg() {
            return navigator.onLine ? '' : '无法连接到网络，请检查网络链接'
        }
    },
    methods: {
        setDelay() {
            return `${Math.random()}s`;
        },
        refresh() {
            let hash = location.hash;
            if (hash.indexOf('fuckrefresh') < 0) {
                location.href = `${hash}&fuckrefresh=${Math.random()}`;
            }
            else {
                hash = hash.split('&fuckrefresh')[0];
                location.href = `${hash}&fuckrefresh=${Math.random()}`;
            }
        }
    }
};
</script>

<style lang="css" scoped>
    .spinner-err{
        width: 100%;
        height: 100%;
        padding-top: 10%;
    }
    .spinner-err img {
        width: 250px;
        height: 240px;
        display: block;
        margin: 0 auto;
    }
    .spinner-err .button{
        text-align: center;
    }
    .spinner-err .button button{
        margin-top: 10px;
    }
    .spinner-err .button em {
        font-style: normal;
        display: block;
        color: #9a9a9a;
        font-size: 14px;
        line-height: 25px;
    }
    .content-area .loading{
        transform: translateX(-5%);
    }
    .loading{
        width: 100%;
        height: 100%;
        position: absolute;
        background: #262626;
        left: 0;
        top: 0;
        z-index: 9999;
    }
    .spinner {
        width: 100%;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .text{
        width: 100%;
        font-size: 16px;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        color: #ccc;
    }
    .double-bounce1, .double-bounce2 {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -45px;
        animation: run 2.0s infinite ease-in-out;
    }
    span{
        animation: runSpan 2.0s infinite ease-in-out;
    }
    .double-bounce2 {
        animation-delay: -1.0s;
    }
    @keyframes run {
        0%, 100% {
            transform: scale(0);
        } 50% {
            transform: scale(1);
        }
    }
    @keyframes runSpan {
        0%, 100% {
            opacity: 0;
        } 50% {
            opacity: 1;
        }
    }
</style>
