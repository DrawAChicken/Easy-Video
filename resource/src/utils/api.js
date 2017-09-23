import Vue from 'vue';
import loading from '../components/loading';

Vue.prototype.$remote = global.remote || {};
Vue.prototype.$ipc = global.ipcRenderer || {};
Vue.prototype.$remoteApi = {};

Object.keys(global.remoteApi).reduce((pre, cur) => {
	pre[cur] = url => {
		const load = loading();
		const storage = localStorage.getItem(url);
		return new Promise((resolve, reject) => {
			if (storage) {
				load.stop();
				resolve(JSON.parse(storage));
			}
			global.remoteApi[cur](url)
				.then(data => {
					load.stop();
					localStorage.setItem(url, JSON.stringify(data));
					resolve(data);
				}).catch(err => {
					console.log(err);
					console.log(url);
					load.err();
				})
		});
	};
	return pre;
}, Vue.prototype.$remoteApi);

export default Vue;