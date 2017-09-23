<template>
    <div>
        <ul class="content-area">
            <li v-for="(item, index) in info" :key="index">
                <div class="title">
                    <h3>
                        <span>{{item.title}}</span>
                        <router-link :to="item.link" tag="em">查看更多
                            <i class="el-icon-arrow-right"></i>
                        </router-link>
                    </h3>
                </div>
                <div class="cell" v-for="(itemData, index) in item.data" :key="index">
                    <router-link tag="div" :to="{path: 'details', query: { url: itemData.link } }" class="img" append>
                        <img v-lazy="itemData.pic" :alt="itemData.name">
                        <p class="title">{{itemData.title}}</p>
                        <div class="video-info">
                            <p class="name">{{itemData.name}}</p>
                            <p class="short" v-if="itemData.score">评分： {{itemData.score}}</p>
                            <p class="starring">{{itemData.starring}}</p>
                        </div>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: '',
            statu: false
        };
    },
    watch: {
		$route() {
			this.getInfo();
		}
	},
    methods: {
        goDetails(val) {
            this.$router.push({
                path: 'details',
                query: {
                    url: val
                }
            });
        },
        getInfo() {
            this.statu = true;
            this.$remoteApi.homePage('http://yinghua.yiyire.cn/')
                .then(data => {
                    this.info = [
                        {
                            title: '热门影片',
                            link: '/dy/classList?url=/?s=vod-show-id-1.html',
                            data: data.movieInfo
                        },
                        {
                            title: '热播电视',
                            link: '/dsj/classList?url=/?s=vod-show-id-2.html',
                            data: data.tvSeriesInfo
                        }
                    ]
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
</style>
