<template>
	<div id="page">
		<el-carousel :interval="4000" type="card" height="200px">
			<el-carousel-item v-for="(item, index) in info.bannerInfo" :key="item">
				<img :src="bannerPicBase[index]" @click="goDetails(item.bannerLink)" style="width:100%;height:100%;">
			</el-carousel-item>
		</el-carousel>
		<ul>
			<li v-for="(item, index1) in info.mainInfo">
				<div class="title">
					<h3>
						<span>{{item.title}}</span>
					</h3>
				</div>
				<div @click="goDetails(item.link)" class="cell" v-for="(item, index2) in item.data">
					<div class="img">
						<img :src="mainPicBase[index1][index2]" alt="">
						<div class="video-info">
							<p class="name">{{item.name}}</p>
							<p class="short">{{item.short}}</p>
							<p class="short">评分： {{item.score}}</p>							
							<p class="starring">{{item.starring}}</p>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
    data() {
        return {
			info: {},
			bannerPicBase:[],
			mainPicBase:[]
        };
    },
	methods: {
		goDetails(val) {
			this.$router.push({
                    path: '/details',
                    query: {
                        url: val
                    }
                });
		},
		setPicBase(val) {
			val.bannerInfo.forEach((item, index) => {
				this.$remoteApi.getImg(item.bannerPic, item => {
					this.$set(this.bannerPicBase, index, item);
					const Json = JSON.stringify(this.bannerPicBase);
					sessionStorage.setItem("bannerPicBase", Json);
				})
			});
			val.mainInfo.forEach((item, index1) => {
				this.$set(this.mainPicBase, index1, []);
				item.data.forEach((item, index2)=> {
					this.$remoteApi.getImg(item.pic, item => {
						this.$set(this.mainPicBase[index1], index2, item);
						const Json = JSON.stringify(this.mainPicBase);
						sessionStorage.setItem("mainPicBase", Json);
					})
				})
			})
		}
	},
	created() {
		const cacheData = sessionStorage.getItem("info");
		const bannerPicBase = sessionStorage.getItem("bannerPicBase");
		const mainPicBase = sessionStorage.getItem("mainPicBase");
		if (cacheData) {
			this.info = JSON.parse(cacheData);
			this.bannerPicBase = JSON.parse(bannerPicBase);
			this.mainPicBase = JSON.parse(mainPicBase);
		}else{
			// sessionStorage.setItem("key", "value"); 
			// console.log(sessionStorage.getItem("key"))
			this.$remoteApi.homePage(data => {
				this.info = data;
				const Json = JSON.stringify(this.info);
				sessionStorage.setItem("info", Json);
				this.setPicBase(this.info);
			})
		}
	}
};
</script>

<style scoped lang="scss">
    #page{
		padding: 30px 15px;
		margin: 0;
		list-style: none;
		box-sizing: border-box;
	}
	ul{
		padding: 0;
		margin: 0;
		li{
			width: 100%;
			overflow: hidden;
			margin-bottom: 10px;
			.title{
				width: 100%;
				padding:0 15px;
				margin-bottom: 15px;
				h3{
					height: 30px;
					margin: 0;
					font-size: 16px;
					font-weight: normal;
					border-bottom: 2px solid #e1e1e1;
					color: #6d6d6d;
					box-sizing: border-box;
					span{
						border-bottom: 4px solid #e1e1e1;
						height: 28px;
						display: inline-block;
						box-sizing: border-box;
					}
				}
			}
			.cell{
				width: 25%;
				height: 25vw;
				float: left;
				padding: 0 15px;
				margin-bottom: 10px;
				.img{
					width: 100%;
					height: 100%;
					border-radius: 4px;
					overflow: hidden;
					position: relative;
					transition: all .5s;
					img{
						width: 100%;
						height: 100%;
						display: block;
						margin: 0 auto;
					}
					.video-info{
						position: absolute;
						bottom: -130px;
						left: 0;
						width: 100%;
						background: rgba(255,255,255,0.6);
						padding: 3px 10px;
						color: #4a4a4a;
						font-size: 12px;
						line-height: 20px;
						height: 165px;
						transition: all .5s;
						.name{
							font-size: 14px;
							line-height: 30px;
							span{
								float: right;
								font-size: 12px;								
							}
						}
					}
					&:hover{
						transform: translateY(-5px);
						box-shadow: 3px 3px 10px 5px #ccc;
						.video-info{
							bottom: 0;
						}
					}
				}
			}
		}
	}
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
