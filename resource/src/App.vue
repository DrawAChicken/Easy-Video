<template>
	<div id="app">
		<div id="title">
			<p>Easy-Video</p>
			<div class="history">
				<el-button type="text" icon="caret-left" @click="history(-1)"></el-button>
				<el-button type="text" icon="caret-right" @click="history(1)"></el-button>
			</div>
			<div class="search">
				<i class="el-icon-search" @click="searchClick"></i>
				<input 
					type="text" 
					placeholder="输入搜索内容" 
					@keyup.enter="searchClick" 
					v-model="search"
				>
			</div>
		</div>
		<router-view id="main"></router-view>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				search: ''
			}
		},
		methods: {
			history(n) {
				this.$router.go(n)
			},
			searchClick() {
				console.log(11);
			},
			goHomePage() {
				this.$router.push({
                    path: '/'
                });
			}
		}
	}
</script>

<style lang="scss">
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	li{
		list-style: none;
	}
	#app{
		font-family: 'Hiragino Sans GB';
		height: 100%;
		width: 100%;
		position: relative;
		padding-top: 40px;
		#title{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;		
			height: 40px;
			-webkit-app-region: drag;
			background: #0f0f0f;
			color: #fff;
			overflow: hidden;
			padding-right: 30px;
			p{
				font-size: 12px;
				width: 90px;				
				float: left;
				line-height: 56px;
				padding-left: 7px;
			}
			.history{
				height: 40px;
				line-height: 40px;
				float: left;
				.el-button{
					margin-left: 5px;
					font-size: 15px;
					color: #fff;
					&:active{
						color: #ccc;
					}
				}
			}
			.search{
				float: right;
				width: 150px;
				margin-top: 10px;
				height: 20px;
				position: relative;
				i{
					width: 35px;
					height: 100%;
					position: absolute;
					right: 0;
					top: 0;
					text-align: center;
					transition: all .3s;
					color: #bfcbd9;
					line-height: 20px;
				}
				input{
					height: 20px;
					line-height: 20px;
					display: block;
					width: 100%;
					background: #e1e1e1;
					font-size: 12px;
					border: 0;
					border-radius: 4px;
					padding: 3px 10px;
					padding-right: 35px;
					color: #1f2d3b;
					outline: 0;
					&:focus{
						background: #fff;
					}
				}
			}
		}
	}
	#main{
		width: 100%;
		height: 100%;
		position: relative;
		background: #fff;
		overflow: hidden;
	}
</style>
