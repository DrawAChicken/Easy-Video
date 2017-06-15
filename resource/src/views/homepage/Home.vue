<template>
    <ul class="content-area">
        <li v-for="item in info">
            <div class="title">
                <h3>
                    <span>{{item.title}}</span>
                    <router-link :to="item.link" tag="em">查看更多<i class="el-icon-arrow-right"></i></router-link>
                </h3>
            </div>
            <div class="cell" v-for="itemData in item.data">
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
</template>

<script>
export default {
    data() {
        return {
			info: ''
        };
    },
	methods: {
		goDetails(val) {
			this.$router.push({
                    path: 'details',
                    query: {
                        url: val
                    }
                });
		}
	},
	mounted() {
		this.$remoteApi.homePage('http://z.qukansha.com/', {
            el: this.$el
        }, data => {
			this.info = [
				{
					title: '热门影片',
					link: '/dy/classList?id=1&type=dy',
					data: data.movieInfo
				},
				{
					title: '热播电视',
					link: '/dsj/classList?id=2&type=dsj',
					data: data.tvSeriesInfo
				}
			]
		})
	}
};
</script>

<style lang="scss" scoped>
    @import '../../assets/css/list.scss';
</style>
