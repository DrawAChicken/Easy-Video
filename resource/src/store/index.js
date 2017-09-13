import Vue from 'vue';
import Vuex from 'vuex';
import loading from './loading';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        loading
    },
    strict: debug,
    mutations: {
    }
});
