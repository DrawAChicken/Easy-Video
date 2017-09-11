<template>
    <ul class="content-area">
        <li class="type">
            <dl v-for="(item, index) in info.typeList" class="type-list" :key="index">
                <dt class="title">{{item.title}}</dt>
                <dd class="content" v-for="(typeData, index) in item.list" :key="index">
                    <router-link :to="{path: 'detailsList', query: {url: typeData.link}}">
                        {{typeData.name}}
                    </router-link>
                </dd>
            </dl>
        </li>
        <li v-for="(item, index) in info.mainList" :key="index">
            <div class="title">
                <h3>
                    <span>{{item.title}}</span>
                    <router-link :to="{path: 'detailsList', query: {url: item.link}}" tag="em">查看更多<i class="el-icon-arrow-right"></i></router-link>
                </h3>
            </div>
            <div class="cell" v-for="(itemData, index) in item.imgList" :key="index">
                <router-link tag="div" :to="{path: 'details', query: {url: itemData.link}}" class="img">
                    <img v-lazy="itemData.pic" :alt="itemData.name">
                    <p class="title">{{itemData.title}}</p>
                    <div class="video-info">
                        <p class="name">{{itemData.name}}</p>
                        <p class="short" v-if="itemData.score">评分: {{itemData.score}}</p>
                    </div>
                </router-link>
            </div>
            <div class="cell-text">
                <div v-for="(textData, index) in item.textList" class="cell" :key="index">
                    <router-link :to="{path: 'details', query: {url: textData.link}}" tag="div">
                        <span :class="{highlight: index <3}">{{index + 1}}. </span>
                        <p>
                            {{textData.name}}
                        </p>
                        <p>
                            {{textData.subName}}
                        </p>
                    </router-link>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            info: ''
        };
    },
    watch: {
        $route() {
            this.getInfo();
        }
    },
    methods: {
        getInfo() {
            this.$remoteApi.classList(`http://yinghua.yiyire.cn${this.$route.query.url}`, {
                el: this.$el
            }, data => {
                this.info = data;
            })
        }
    },
    mounted() {
        this.getInfo();
    }
};
</script>

<style lang="scss" scoped>
    @import '../../assets/css/list.scss';
    .content-area{
        .type{
            font-size: 12px;
            .type-list{
                width: 100%;
                overflow: hidden;
                line-height: 20px;
                padding: 5px 10px;
                .title{
                    float: left;
                    width: auto;
                    padding: 0;
                    margin: 0;
                    padding: 0 15px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    font-size: 13px;
                    margin-right: 5px;
                    color: #4a4a4a;
                }
                .content{
                    float: left;
                    padding: 0 5px;
                    a{
                        text-decoration: none;
                        color: #666;
                    }
                }
            }
        }
        li{
            .cell{
                width: 33.3333%;
                height: 34vw;
                padding: 0 2.3%;
                .img{
                    .video-info{
                        p{
                            float: left;
                            line-height: 30px;
                        }
                        .short{
                            float: right;
                        }
                    }
                }
            }
            .cell-text{
                overflow: hidden;
                float: left;
                .cell{
                    height: auto;
                    div{
                        background: #fafafa;
                        border-radius: 4px;
                        font-size: 12px;
                        line-height: 20px;
                        position: relative;
                        padding: 3px 16px;
                        span{
                            width: 16px;
                            text-align: center;
                            text-indent: 3px;
                            position: absolute;
                            left: 0;
                            top: 3px;
                        }
                        .highlight{
                            color: #ff7f0a;
                        }
                        p{
                            width: 100%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            cursor: pointer;
                            &:nth-child(3){
                                text-align: right;
                            }
                        }
                        &:hover{
                            background: #f0f0f0;
                        }
                    }
                }
            }
        }
    }
</style>
