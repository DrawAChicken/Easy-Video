import Vue from 'vue';
import loading from '../components/loading';

Vue.prototype.$remote = global.remote || {};
Vue.prototype.$ipc = global.ipcRenderer || {};
Vue.prototype.$remoteApi = {};

Object.keys(global.remoteApi).reduce((pre, cur) => {
	pre[cur] = url => {
		const load = loading();
		return new Promise((resolve, reject) => {
			global.remoteApi[cur](url, (err, data) => {
				if (err) {
					console.log(err);
					load.err();
					return;
				}
				load.stop();
				resolve(data);
			});
		});
	};
	return pre;
}, Vue.prototype.$remoteApi);

export default Vue;