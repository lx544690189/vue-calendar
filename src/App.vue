<template>
	<div id="app">
		<p>DEMO1：默认已选日期为当天</p>
		<p class="detail">
			当前日期：{{ demo1.selectedDate }}
		</p>
		<button @click="demo1Click">打开/关闭日期选择器</button>
		<calendar
			v-model="demo1.calendarShow"
			:defaultDate="demo1.defaultDate"
			@onChange="demo1DateChange">
		</calendar>
		<p>DEMO2：多语言-英语</p>
		<button @click="demo2Click">打开/关闭日期选择器</button>
		<calendar
			v-model="demo2.calendarShow"
			:month="demo2.month"
			:week="demo2.week">
		</calendar>
		<p>DEMO3：日期格式化</p>
		<p class="detail">
			当前日期：{{ demo3.selectedDate }}
		</p>
		<button @click="demo3Click">打开/关闭日期选择器</button>
		<calendar
			v-model="demo3.calendarShow"
			:format="demo3.format"
			@onChange="demo3DateChange">
		</calendar>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				demo1 :{
					calendarShow: false,
					defaultDate:new Date(),
					selectedDate:dateFormat(new Date(),"yyyy-MM-dd")
				},
				demo2 :{
					calendarShow: false,
					month:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					week:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
				},
				demo3 :{
					calendarShow: false,
					format:"yyyy年MM月dd日",
					selectedDate:""
				},
			}
		},
		methods: {
			demo1Click() {
				this.demo1.calendarShow = !this.demo1.calendarShow;
			},
			demo2Click() {
				this.demo2.calendarShow = !this.demo2.calendarShow;
			},
			demo3Click() {
				this.demo3.calendarShow = !this.demo3.calendarShow;
			},
			demo1DateChange(date,formatDate){
				this.demo1.selectedDate = formatDate;
			},
			demo3DateChange(date,formatDate){
				this.demo3.selectedDate = formatDate;
			}
		}
	}
	
	function dateFormat(date,fmt) {
		var o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate()
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
</script>

<style type="text/css">
	button{
		width: 100%;
		padding: 5px;
	}
	.detail{
		font-size: 14px;
	}
</style>