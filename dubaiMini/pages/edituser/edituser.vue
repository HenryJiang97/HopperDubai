<template>
	<view class="page">
		<view class="feedback-title">
			<text>{{ i18n.myphoto }} 1</text>
		</view>
		<view class="feedback-body feedback-uploader">
			<view class="uni-uploader">
				<!-- <view class="uni-uploader-head">
		            <view class="uni-uploader-info">{{imageList.length}}/9</view>
		        </view> -->
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;margin:0 auto;">
								<image style="border-radius:10upx;" class="uni-uploader__img" :src="image.url" @click="previewImage(image.url)" mode="aspectFill"></image>
								<view class="close-view" @click="close(image)">x</view>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-show="imageList.length < 1"><view class="uni-uploader__input" @tap="chooseImg"></view></view>
					</view>
				</view>
			</view>
		</view>

		<view class="feedback-title">
			<text>{{ i18n.nickName }}</text>
		</view>
		<view class="feedback-body"><input class="feedback-input" v-model="nickName" :placeholder="i18n.nickName" /></view>

		<!-- 	<view class='feedback-title'>
			<text>{{lang.intro}}</text>
			<text>{{currentIntroLength}}/1000</text>
			<text class="feedback-quick" @tap="chooseMsg">快速键入</text> 
		</view> -->

		<!-- <view class="feedback-body">
			<textarea style="height: 300upx;" :placeholder="lang.introHolder" :maxlength="1000" v-model="intro" class="feedback-textare" />
		</view> -->

		<!-- <view class='feedback-title'>
			<text>{{lang.englishLevel}}</text> 
			<text class="feedback-quick" @tap="chooseMsg">快速键入</text> 
		</view> -->
		<!-- <view class="feedback-body">
			<slider @change="onEnglishLevel" v-model="englishLevel" min="0" max="10"  show-value/>
		</view>-->

		<view class="feedback-title">
			<text>{{ i18n.mywechat }}</text>
		</view>
		<view class="feedback-body"><input class="feedback-input" v-model="wechat" :placeholder="i18n.mywechatHolder" /></view>

		<!-- <view class='feedback-title feedback-star-view'>
            <text>应用评分</text>
            <view class="feedback-star-view">
                <text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < sendDate.score ? 'active' : ''" @tap="chooseStar(value)"></text>
            </view>
        </view> -->

		<view class="feedback-title"><text></text></view>

		<button type="" class="feedback-submit main_button_color" @tap="send">{{ i18n.confirm }}</button>
	</view>
</template>

<script>
let AV = require('../../common/parse.js');

const removeObj = function(_arr, _obj) {
	var length = _arr.length;
	for (var i = 0; i < length; i++) {
		if (_arr[i] == _obj) {
			if (i == 0) {
				_arr.shift(); //删除并返回数组的第一个元素
				return;
			} else if (i == length - 1) {
				_arr.pop(); //删除并返回数组的最后一个元素
				return;
			} else {
				_arr.splice(i, 1); //删除下标为i的元素
				return;
			}
		}
	}
};

export default {
	data() {
		return {
			lang: {},
			user: '',
			stars: [1, 2, 3, 4, 5],
			imageList: [],
			intro: '我叫～～',
			nickName: '',
			wechat: '',
			industry: '',
			englishLevel: 0
		};
	},

	computed: {
		currentIntroLength: function() {
			return this.intro.length; // 解决 Iphone 下面的bug
		}
	},

	methods: {
		onEnglishLevel(e) {
			// console.log(e);
			this.englishLevel = e.mp.detail.value;
		},
		close(img) {
			uni.showLoading({
				title: 'loading..',
				mask: true
			});
			AV.File.createWithoutData(img.id)
				.destroy()
				.then(r => {
					console.log('删除成功');
					removeObj(this.imageList, img);
					uni.hideLoading();
				})
				.catch(console.error);
		},
		chooseMsg() {
			//快速输入
			uni.showActionSheet({
				itemList: this.msgContents,
				success: res => {
					this.sendDate.content = this.msgContents[res.tapIndex];
				}
			});
		},

		chooseImg() {
			//选择图片
			uni.gefile

			uni.chooseImage({
				sourceType: ['camera', 'album'],
				sizeType: 'compressed',
				count: 1 - this.imageList.length,
				success: res => {
					console.log(res);

					uni.showLoading({
						title: 'loading..',
						mask: true
					});

					res.tempFiles
						.map(tempFile => () => new AV.File('userProfile',tempFile ).save())
						.reduce((m, p) => m.then(v => AV.Promise.all([...v, p()])), AV.Promise.resolve([]))
						.then(files => {
							let imaUrls = files.map(file => {
								console.log('file');
								console.log(file);

								return { url: file.url(), id: file.id };
							});
							console.log(imaUrls);

							this.imageList = this.imageList.concat(imaUrls);

							uni.hideLoading();

							console.log();
						})
						.catch(console.error);
				}
			});
		},
		chooseStar(e) {
			//点击评星
			this.sendDate.score = e;
		},
		previewImage(x) {
			//预览图片
			let previewImg = this.imageList.map(i => i.url);
			uni.previewImage({
				current: x,
				urls: previewImg
			});
		},
		send() {
			//保存个人信息
			uni.showLoading({
				title: 'loading..',
				mask: true
			});
			let that = this;
			AV.User.current()
				.set({
					intro: this.intro,
					wechat: this.wechat,
					industry: this.industry,
					images: this.imageList,
					nickName: this.nickName
					// englishLevel: this.englishLevel
				})
				.save()
				.then(r => {
					uni.hideLoading();
					uni.showModal({
						title: that.lang.successTitle,
						content: that.lang.successContent,
						showCancel: false,
						confirmText: that.lang.confirmText,
						success() {
							if (that.$store.state.language === 1) {
								// 如果是英文就什么都不做
								console.log('??');

								uni.reLaunch({
									url: '../userCenter/userCenter'
								});
							} else {
								uni.reLaunch({
									url: '../userCenter/userCenter'
								});
							}
						}
					});
					console.log(r);
				})
				.catch(console.error);
		}
	},
	onLoad() {
		console.log('当前的用户' + AV.User.current());

		// 			let user = AV.User.current().toJSON()
		// 			this.user = user
		// 			this.intro = user.intro || '我叫'+ user.wechatProfile.nickName +' 很高兴认识大家～～'
		// 			this.wechat = user.wechat || ''
		// 			this.industry = user.industry || ''
		// 			this.imageList = !!(user.images)? user.images : [],
		// 			this.nickName = !!(user.nickName)? user.nickName : user.wechatProfile.nickName
		// this.englishLevel = user.englishLevel
	},
	onShow() {}
};
</script>

<style>
page {
	background-color: #efeff4;
}

.input-view {
	font-size: 28upx;
}
.close-view {
	text-align: center;
	line-height: 20upx;
	height: 30upx;
	width: 30upx;
	border-radius: 50%;
	background: #ff5053;
	color: #ffffff;
	position: absolute;
	top: -10upx;
	right: -10upx;
	font-size: 20upx;
}
</style>
