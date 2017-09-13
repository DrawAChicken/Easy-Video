<template>
    <div class="box">
        <div class="bg" :style="{'background-image': `url(${info.pic})`}"></div>
        <div class="board">
            <el-popover ref="popover" placement="right" width="400" trigger="click" :visible-arrow="false">
                <el-tabs class="tab" type="card" ref="tabs">
                    <el-tab-pane :label="item.title" v-for="(item, index) in info.juji" :key="index">
                        <router-link :to="{path: 'videoplayer', query: {url: i.link}}" v-for="(i, index) in item.data" :key="index">{{i.name}}</router-link>
                    </el-tab-pane>
                </el-tabs>
            </el-popover>
            <div class="pic">
                <img :src="info.pic" :alt="info.name" @error="setErrorImg">
                <el-button type="text" class="play-icon" v-popover:popover></el-button>
            </div>
            <div class="video-info">
                <p class="name">{{info.name}}</p>
                <p class="actors">
                    <span class="left">状态 :</span>
                    <span class="actor">{{info.status}}</span>
                </p>
                <p class="actors">
                    <span class="left">导演 :</span>
                    <span v-for="(item, index) in info.director" :key="index" class="actor">{{item}}</span>
                </p>
                <p class="actors">
                    <span class="left">类型 :</span>
                    <span v-for="(item, index) in info.type" :key="index" class="actor">{{item}}</span>
                </p>
                <p class="actors">
                    <span class="left">演员 :</span>
                    <span v-for="(item, index) in info.actors" :key="index" class="actor">{{item}}
                        <i v-if="index != info.actors.length-1">、</i>
                    </span>
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
            info: ''
        };
    },
    methods: {
        setErrorImg(e) {
            e.target.src = require('../../assets/erroPic.png');
            e.target.style = 'border: 1px solid #ccc';
        },
        getInfo() {
            this.$remoteApi.details(`http://yinghua.yiyire.cn${this.$route.query.url}`, this)
                .then(data => {
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
        }
    },
    mounted() {
        this.getInfo();
    }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(0, 150, 255, 0.16);
    .bg {
        width: 100%;
        height: 100%;
        filter: blur(30px);
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
    }
    .board {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.2);
        top: 0;
        left: 0;
        .pic {
            width: 35%;
            height: 80%;
            position: absolute;
            top: 10%;
            left: 10%;
            img {
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
            .play-icon {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: 100px;
                height: 100px;
                display: block;
                opacity: 0;
                position: absolute;
                transition: all .5s;
                background: url('../../assets/play.png');
                background-size: 100%;
            }
            &:hover .play-icon {
                opacity: 1;
            }
        }
        .video-info {
            padding: 10px;
            width: 40%;
            height: 80%;
            overflow: auto;
            position: absolute;
            top: 10%;
            right: 10%;
            font-size: 13px;
            color: #111;
            min-height: 80%;
            background: rgba(245, 245, 245, 0.16);
            border-radius: 4px;
            p {
                overflow: hidden;
                position: relative;
                padding-left: 40px;
            }
            .name {
                font-size: 30px;
                line-height: 30px;
                margin-bottom: 10px;
                padding: 0;
            }
            span {
                float: left;
                line-height: 20px;
            }
            .actor {
                padding: 0 2px;
            }
            .left {
                width: 40px;
                color: #111;
                text-align: center;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
}

.tab {
    width: 100%;
    overflow: hidden;
    background: #1e2022;
    border-radius: 4px;
    .el-tab-pane {
        padding: 5px;
        width: 100%;
        max-height: 80vh;
        overflow: auto;
        border: 1px solid #d1dbe5;
        border-top: 0;
        margin-top: -1px;
        border-radius: 0 0 4px 4px;
        a {
            width: 12.5%;
            padding: 0 3px;
            text-align: center;
            font-size: 12px;
            color: #e3e3e3;
            float: left;
            text-decoration: none;
            border-bottom: 1px;
            height: 33px;
            line-height: 33px;
            overflow: hidden;
            border-radius: 3px;
            &:hover {
                background: #fff;
                color: #4a4a4a;
                font-size: 10px;
                transform: scale(1.3);
            }
        }
    }
}
</style>
