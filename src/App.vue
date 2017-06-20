<template>
	<div id="app">
		<button @click="initCalendar">打开calendar</button>
		<calendar v-model="calendarShow"
			@onChange="dateChange">
		</calendar>
		<div>
			{{ date.year }} - {{ date.month }} - {{ date.day }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				calendarShow: false,
				date:{}
			}
		},
		created() {
			
		},
		methods: {
			initCalendar() {
				this.calendarShow = !this.calendarShow;
			},
			dateChange(calendar,date){
				this.date = date;
				//console.log(date)
			}
		}
	}
</script>