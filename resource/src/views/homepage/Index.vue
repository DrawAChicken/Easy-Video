<template>
	<div>
		<ul class="left-side-menu">
			<router-link tag="li" to="/home">首页</router-link>
			<router-link tag="li" to="/dy">电影</router-link>
			<router-link tag="li" to="/dsj">电视剧</router-link>
			<router-link tag="li" to="/dm">动漫</router-link>
			<router-link tag="li" to="/zy">综艺</router-link>
			<router-link tag="li" to="/bd/classList?url=/?s=my-show-id-top.html">榜单</router-link>
			<li class="refresh" @click="goDetails('itemData.link')">
				刷新资源
				<i class="el-icon-upload"></i>
			</li>
		</ul>
		<router-view class="main-content" ref="abb"></router-view>
		<loading v-if="$store.state.loading.statu === 'start' || $store.state.loading.statu === 'err'"></loading>
	</div>
</template>

<script>
import Loading from '../../components/loading.vue'
export default {
	data() {
		return {}
	},
	watch: {
		$route() {
			this.$refs.abb.getInfo()
			console.log();
		}
	},
	methods: {
		goDetails(val) {
			this.$router.push({
				path: '/details',
				query: {
					url: val
				}
			});
		}
	},
	components: {
		Loading
	}
};
</script>

<style scoped lang="scss">
#main {
	padding-left: 90px;
	.left-side-menu {
		position: absolute;
		left: 0;
		top: 0;
		width: 90px;
		height: 100%;
		background: #1e2022;
		font-size: 15px;
		color: #fff;
		line-height: 40px;
		z-index: 999999;
		li {
			padding-left: 20px;
		}
		.refresh {
			position: absolute;
			bottom: 0;
			left: 0;
			font-size: 12px;
			padding: 0;
			text-align: center;
			width: 100%;
		}
		.router-link-active {
			background: #444;
			border-left: 5px solid #ccc;
			padding-left: 15px;
		}
	}
}

.main-content {
	position: relative;
}
</style>
