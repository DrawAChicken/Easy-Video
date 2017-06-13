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
                <div class="img" @click="goDetails(itemData.link)">
                    <img v-lazy="itemData.pic" :alt="itemData.name">
                    <p class="title">{{itemData.title}}</p>
                    <div class="video-info" v-height>
                        <p class="name">{{itemData.name}}</p>
                        <p class="short" v-if="itemData.score">评分： {{itemData.score}}</p>							
                        <p class="starring">{{itemData.starring}}</p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
			info: [
				{
					title: '热门影片',
					link: '/dy'
				},
				{
					title: '热播电视',
					link: '/dsj'
				}
			]
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
		}
	},
	created() {
		this.$remoteApi.homePage(data => {
			this.info = [
				{
					title: '热门影片',
					link: '/dy',
					data: data.movieInfo
				},
				{
					title: '热播电视',
					link: '/dsj',
					data: data.tvSeriesInfo
				}
			]
		})
	}
};
</script>

<style lang="scss" scoped>
    .content-area{
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		overflow: auto;
		padding: 30px 20px;
		li{
			width: 100%;
			overflow: hidden;
			margin-bottom: 20px;
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
					overflow: hidden;					
					span{
						border-bottom: 4px solid #e1e1e1;
						height: 28px;
						box-sizing: border-box;
						float: left;
					}
					em{
						float: right;
						font-style: normal;
						font-size: 12px;
						line-height: 30px;
						i{
							margin-left: 4px;
						}
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
					.title{
						position: absolute;
						top: 0;
						right: 0;
						font-size: 13px;
						margin: 0;
						padding: 2px;
						width: auto;
						color: #fff;
						background: rgba(0,0,0,0.4);
					}
					.video-info{
						position: absolute;
						bottom: 35px;
						left: 0;
						width: 100%;
						background: rgba(255,255,255,0.6);
						padding: 3px 10px;
						color: #4a4a4a;
						font-size: 12px;
						line-height: 20px;
						transition: all .5s;
						transform: translateY(100%);
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
							transform: translateY(0);
							bottom: 0;
						}
					}
				}
			}
		}
	}
</style>
