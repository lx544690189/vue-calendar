<template>
	<div id="app">
		<button @click="initCalendar">打开calendar</button>
		<calendar
			v-model="calendarShow"
			format="yyyy-MM-dd"
			:defaultDate="defaultDate"
			@onChange="dateChange">
		</calendar>
		<div>
			{{ selectedDate }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				calendarShow: false,
				defaultDate:new Date(),
				selectedDate:""
			}
		},
		methods: {
			initCalendar() {
				this.calendarShow = !this.calendarShow;
			},
			dateChange(date,formatDate){
				this.selectedDate = formatDate;
				console.log(date)
			}
		}
	}
</script>