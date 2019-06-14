<template>
	<div>
		
		
		
		
	</div>
</template>

<script>
export default {
	props: {
		isShow: {
			//弹窗组件是否显示 默认不显示
			type: Boolean,
			default: false,
			required: true //必须
		}
	},
	data() {
		return {};
	},

	methods: {
		hahah(){
			console.log('11' + JSON.stringify());
		},
		hideModal() {
			console.log('关闭' + JSON.stringify());
			// 这个方法是预先在子组件里面定义一个方法，就是给父组件发信号，这样父组件就可以自己定义一个方法来控制这个子组件
			this.$emit('onClose');
			//如果需要传参的话，可以在"on-close"后面再加参数，然后在父组件的函数里接收就可以了。
		}
	},
	created() {
		console.log('111' + JSON.stringify());
	},
};
</script>

<style scoped></style>
