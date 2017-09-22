import VueLazyload from 'vue-lazyload';
import Vue from './utils/api';
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
});

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
