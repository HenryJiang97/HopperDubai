<template>
  <div class="qa">
    <cu-custom bgColor="my_header_background" :isBack="true">
			<block slot="backText">回产品详情</block>
			<block slot="content">产品问答</block>
		</cu-custom>
		
		<div class="main">
			
			<div class="cu-bar bg-white padding-lr">
				<text>Feel free to ask cause one questions about makeuo and beauty</text>
				<button @tap="jump" class="cu-btn round lg bg-red margin-left" style="flex-shrink: 0;">提问</button>
			</div>
			
			<!-- 聊天窗口 -->
				<view class="cu-list menu-avatar comment solids-top">
					
					<view class="cu-item solid-bottom" v-for="(x,i) in 3" :key="i">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view >小龙虾 <text class="cuIcon-baby margin-left text-gray">油性皮肤</text></view>
							<view class="text-content text-df">
								我是干性皮肤，请问我可以使用这个产品吗？么么哒
							</view>
							<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view class="flex-sub"><text>客服回复：</text>hey 妹子，干性皮肤不适合你哦，你也许可以实施我们的其他产品。这个是油性皮肤专用的产品哦。/</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<!-- <text class="cuIcon-messagefill text-gray margin-left-sm"></text> -->
								</view>
							</view>
						</view>
					</view>

				
					
				</view>
			
			<!-- 聊天窗口 -->
			
			
		</div>

  </div>
</template>

<script>
 
  export default {
    mounted() {
      //判断是否登录获取用户信息
    
    },
    data() {
      return {
       
      };
    },
    components: {},
    methods: {
		jump(){
			uni.navigateTo({
				url:'../qaAsk/qaAsk'
			})
		}
      
    },
    computed: {}
  };

</script>

