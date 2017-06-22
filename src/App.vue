<template>
	<div id="app">
		<button @click="initCalendar">打开calendar</button>
		<calendar
			v-model="calendarShow"
			format="yyyy-MM-dd"
			:defaultDate="new Date()"
			@onChange="dateChange">
		</calendar>
		<div>
			{{ date }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				calendarShow: false,
				date:""
			}
		},
		methods: {
			initCalendar() {
				this.calendarShow = !this.calendarShow;
			},
			dateChange(date,formatDate){
				this.date = formatDate;
				console.log(date)
			}
		}
	}
</script>