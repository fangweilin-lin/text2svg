import Vue from 'vue'
import App from './App.vue'
import text2svg from './package'
Vue.config.productionTip = false

Vue.use(text2svg)
new Vue({
	render: h => h(App)
}).$mount('#app')
