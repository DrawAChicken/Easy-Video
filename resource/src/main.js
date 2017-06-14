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

Vue.use(VueLazyload, {
  error: erro,
  loading: pic,
  attempt: 1
})
Vue.use(ElementUI);
Vue.prototype.$remote = global.remote || {};
Vue.prototype.$ipc = global.ipcRenderer || {};
Vue.prototype.$remoteApi = global.remoteApi;

new Vue({
	el: '#app',	
	router,
	store,
	render: h => h(App)
});
