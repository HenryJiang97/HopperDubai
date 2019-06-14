<template>
	<view class="page" >	
		
		<cu-custom bgColor="my_header_background" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">提问</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom " >
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					你的粉丝们会收到提醒的哦～
				</view>

				<view class="action">
					<button class="margin padding-lr text-white" type="primary" @tap="send">
						<text>发表</text>
					</button>
				</view>
		</view>
		
		<form>
			
			<view class="cu-form-group margin-top-sm">
				<input type="text" value="" v-model="question.title" placeholder="标题" />
			</view>
			
			<view class="cu-form-group margin-top-sm">
				<textarea maxlength="-1" 
				placeholder="问题..." 
				v-model="question.desc"></textarea>
			</view>
			
			
			<!-- <view class="uni-textarea"><textarea placeholder="这一刻的想法..." v-model="input_content" /></view> -->
			
		

		</form>
	</view>
</template>

<script>
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
import Parse from '../../common/parse.js'
export default {
	data() {
		return {
			question:{
				title:'',
				desc:''
			},
			
			imgList:[],
			// title: 'choose/previewImage',
			input_content: '',
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

			//侧滑返回start
			startX: 0, //点击屏幕起始位置
			movedX: 0, //横向移动的距离
			endX: 0 //接触屏幕后移开时的位置
			//end
		};
	},
	onUnload() {
		
		(this.imageList = []),
			(this.sourceTypeIndex = 2),
			(this.sourceType = ['拍照', '相册', '拍照或相册']),
			(this.sizeTypeIndex = 2),
			(this.sizeType = ['压缩', '原图', '压缩或原图']),
			(this.countIndex = 8);
	},
	onNavigationBarButtonTap(e) {
		//监听右上自定义按钮点击事件
		if (e.index == 0) {
			uni.switchTab({
				url: '../find'
			});
		}
	},
	methods: {
		
		 send(){
			Parse.Cloud.run('postQuestion',this.question).then( r => {
				console.log('r' + JSON.stringify(r));
				
				uni.showModal({
					title:'提问成功！',
					showCancel:false,
					success() {
						uni.navigateBack({
							
						})
					}
				})
				
			}).catch( e => {
				
			})
		},
		
		ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		close(e) {
			this.imageList.splice(e, 1);
		},
		chooseImage: async function() {
			if (this.imageList.length === 9) {
				let isContinue = await this.isFullImg();
				console.log('是否继续?', isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
				}
			});
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '已经有9张图片了,是否清空现有图片？',
					success: e => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			// 					var current = 'https://i.loli.net/2019/02/18/5c6a6e2623448.jpg'
			// 					this.imageList = ['https://i.loli.net/2019/02/18/5c6a6e2623448.jpg','https://i.loli.net/2019/02/18/5c6a6e49829ea.jpg']
			console.log(current);
			console.log(this.imageList);
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		touchStart: function(e) {
			this.startX = e.mp.changedTouches[0].pageX;
		},

		touchEnd: function(e) {
			this.endX = e.mp.changedTouches[0].pageX;
			if (this.endX - this.startX > 200) {
				uni.navigateBack();
			}
		}
	}
};
</script>

<style scoped>
.footer {
	margin-top: 80upx;
}

.cell-pd {
	padding: 20upx 30upx;
}

.uni-textarea {
	width: auto;
	padding: 20upx 25upx;
	line-height: 1.6;
	height: 150upx;
}
.uni-list::before {
	height: 0;
}
.uni-list:after {
	height: 0;
}
.list-pd {
	margin-top: 0;
}
.close-view {
	text-align: center;
	line-height: 22upx;
	height: 24upx;
	width: 24upx;
	border-radius: 50%;
	background: #ef5350;
	color: #ffffff;
	position: absolute;
	top: 6upx;
	right: 8upx;
	font-size: 24upx;
}
.page {
	width: 750upx;
	height: 100%;
}
</style>
