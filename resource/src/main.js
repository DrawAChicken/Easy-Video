import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import pic from './assets/imageLoad.gif';
import erro from './assets/erroPic.png';
import 'element-ui/lib/theme-default/index.css'
import 'normalize.css';
import 'animate.css';
import '../src/assets/css/el.scss';

Vue.use(VueLazyload, {
	error: erro,
	loading: pic,
	attempt: 1
})
Vue.use(ElementUI);
Vue.prototype.$remote = global.remote || {};
Vue.prototype.$ipc = global.ipcRenderer || {};
Vue.prototype.$remoteApi = {};

Object.keys(global.remoteApi).reduce((pre, cur) => {
	pre[cur] = function (url, _this) {
		return new Promise((resolve, reject) => {
			_this.$store.commit('setLoadingStatu', 'start')
			global.remoteApi[cur](url, (err, data) => {
				if (err) {
					console.log(err);
					_this.$store.commit('setLoadingStatu', 'err')
					return
				}
				_this.$store.commit('setLoadingStatu', 'stop')
				resolve(data);
			})
		})
	}
	return pre
}, Vue.prototype.$remoteApi)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
