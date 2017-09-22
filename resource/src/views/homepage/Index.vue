<template>
	<div :class="{'htmlfullscreen': HTMLFullScreen}">
		<ul :class="[{'htmlfullscreen': HTMLFullScreen}, 'left-side-menu']">
			<router-link tag="li" to="/home?a=1">首页</router-link>
			<router-link tag="li" to="/dy">电影</router-link>
			<router-link tag="li" to="/dsj">电视剧</router-link>
			<router-link tag="li" to="/dm">动漫</router-link>
			<router-link tag="li" to="/zy">综艺</router-link>
			<router-link tag="li" to="/bd/classList?url=/?s=my-show-id-top.html">榜单</router-link>
			<li class="refresh" @click="goDetails()">
				刷新资源
				<i class="el-icon-upload"></i>
			</li>
		</ul>
		<router-view class="main-content" ref="container"></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			HTMLFullScreen: false
		}
	},
	methods: {
		goDetails() {
			const query = this.$route.query;
			query.fuckrefresh = Math.random();
			const hashQuery = Object.keys(query).map(item => `${item}=${query[item]}`).join('&');
			console.log(hashQuery);
			location.replace(`#${this.$route.path}?${hashQuery}`);
		}
	},
	mounted() {
		this.$ipc.on('enter-html-full-screen', () => {
			this.HTMLFullScreen = true;
		})
		this.$ipc.on('leave-html-full-screen', () => {
			this.HTMLFullScreen = false;
		})
	}
};
</script>

<style scoped lang="scss">
#main {
	padding-left: 90px;
	&.htmlfullscreen {
		padding: 0;
	}
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
		&.htmlfullscreen {
			display: none;
		}
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
	height: 100%;
	overflow: auto;
}
</style>
