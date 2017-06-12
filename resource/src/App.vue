<template>
	<div id="app">
		<div id="title">
			<div id="titleLeft">
				
			</div>
			<div id="titleMain">Easy-Video</div>
		</div>
		<div id="main">
			<div id="leftMenu">
				<img src="./assets/logo.png" alt="Video" @click="goHomePage()" class="logo">
			</div>
			<div id="page">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				input2: ''
			}
		},
		methods: {
			goHomePage() {
				this.$router.push({
                    path: '/'
                });
			},
			handleIconClick() {

			}
		},
		created() {
			// console.log(this.$remote.dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));
			// console.log(this.$remote)
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	li{
		list-style: none;
	}
	#app{
		font-family: 'Hiragino Sans GB';
		height: 100%;
		width: 100%;
		position: relative;
		padding-top: 30px;
	}
	/*title*/
	#title{
		position: absolute;
		padding-left: 160px;
		top: 0;
		left: 0;
		width: 100%;		
		height: 30px;
		-webkit-app-region: drag;
		background: #eae5e9;
	}
	#title #titleLeft{
		position: absolute;
		top: 0;
		left: 0;
		width: 160px;
		height: 30px;
		background: #3c3e55;
	}
	#title #titleMain{
		font: 12px;
		line-height: 30px;
		text-align: center;
		color: #4a4a4a;
		width: 100%;
		height: 30px;
		padding: 0 15px 0 30px;
	}
	/*主体*/
	#main{
		width: 100%;
		height: 100%;
		position: relative;
		padding-left: 160px;
		background: #eeecef;
		overflow: hidden;
	}
	#main #leftMenu{
		position: absolute;
		left: 0;
		top: 0;
		width: 160px;
		height: 100%;
		background: #3c3e55;
	}
	#main #leftMenu img {
		width: 60px;
		margin: 20px auto;
		display: block
	}
	#main #page{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
</style>
