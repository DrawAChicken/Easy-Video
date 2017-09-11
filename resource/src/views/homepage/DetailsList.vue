<template>
    <ul class="content-area">
        <li class="type">
            <dl v-for="(item, index) in info.typeList" class="type-list" :key="index">
                <dd class="content" v-for="(typeData, index) in item" :key="index" :class="typeData.className">
                    <router-link :to="{path: 'detailsList', query: {url: typeData.link}}">
                        {{typeData.name}}
                    </router-link>
                </dd>
            </dl>
        </li>
        <li>
            <div class="title">
                <h3>

                </h3>
            </div>
            <div class="cell" v-for="(itemData, index) in info.list" :key="index">
                <router-link tag="div" :to="{path: 'details', query: {url: itemData.link}}" class="img">
                    <img v-lazy="itemData.pic" :alt="itemData.name">
                    <p class="title">{{itemData.title}}</p>
                    <div class="video-info">
                        <p class="name">{{itemData.name}}</p>
                        <p class="short" v-if="itemData.score">评分: {{itemData.score}}</p>
                    </div>
                </router-link>
            </div>
            <el-pagination
                v-if="this.info"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="info.pagination.totalPages"
                :current-page="info.pagination.currentPage"
                class="pagination"
                >
            </el-pagination>
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
        handleCurrentChange(val) {
            let url = this.$route.query.url;
            if (url.indexOf('-p-') > 0) {
                url = url.split('-p-')[0];
                this.getInfo(`${url}-p-${val}.html`);
                return;
            };
            url = url.split('.html')[0];
            this.getInfo(`${url}-p-${val}.html`);
        },
        getInfo(url = this.$route.query.url) {
            this.$remoteApi.detailsList(`http://yinghua.yiyire.cn${url}`, {
                el: this.$el
            }, data => {
                this.info = data;
                const [totalNumber, totalPages] = this.info.pagination.totalNumber.split('/');
                this.info.pagination = {
                    currentPage: +totalNumber.charAt(totalNumber.length - 1),
                    totalNumber: totalNumber.substring(0, totalNumber.length - 2),
                    totalPages: +totalPages
                };
                this.info.typeList = this.info.typeList.filter( item => {
                    if (item.length) {
                        return item
                    }
                });
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
                    height: 20px;
                    a{
                        text-decoration: none;
                        color: #999;
                    }
                    &:nth-child(1){
                        height: 21px;
                    }
                }
                .cur{
                    border-bottom: 1px solid #444;
                    a{
                        color: #444;
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
            .pagination{
                width: 100%;
                height: 30px;
                float: left;
                margin-top: 10px;
                text-align: center;
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
