import Vue from 'vue';
import Calendar from './index'

const install = function(Vue) {
	Vue.component(Calendar.name, Calendar);
}

Vue.$calendar = Vue.prototype.$calendar = Calendar;

if(typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
};

export default {
	install
}