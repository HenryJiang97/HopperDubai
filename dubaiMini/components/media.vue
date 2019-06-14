<template>
	<view class="page">	
			
		<!-- 图片上传部分 -->
		<view class="cu-bar bg-white ">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
				 :key="index" @tap="ViewImage" :data-url="imgList[index].tempPath">
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<!-- 图片上传部分 -->
		
	</view>
</template>

<script>
// 这个组件处理 评论，状态，
	
	
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];

export default {
	data() {
		return {
			imgList:[],
			imgPathList:[], // 图片服务器路径地址
			// title: 'choose/previewImage',
			input_content: '',
			imageList: [], // 预览图片数组
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
	watch: {
		imgList(newValue, oldValue){
			
		  function upload (x){
			  
			  return 1
				//  uni.uploadFile({
				// 	url:'http://localhost:1337/upload/',
				// 	header: { "Content-Type": "multipart/form-data",'accept': 'application/json' },
				// 	filePath:x,
				// 	name:'tempImg',
				// 	success(r) {
				// 		console.log('上传完成' + JSON.stringify(r));
				// 		if (r.statusCode === 200){
				// 			console.log('' + r.data);
				// 			return r.data
				// 		}
				// 	}
				// 	
				// })
			}
		

			
						
		
　　		}
	},
	methods: {
		
		
		
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
				})
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

</style>
