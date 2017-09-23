import Vue from 'vue';

const a = require('./loading.vue');
const loadingConstructor = Vue.extend(a.default);

let getAnInstance = () => {
    return new loadingConstructor({
        el: document.createElement('div')
    });
};

loadingConstructor.prototype.stop = function () {
    this.apiError = false;
    const child = document.getElementById(this._uid);
    if (child) {
        document.body.removeChild(child);
    }
};
loadingConstructor.prototype.err = function () {
    this.apiError = true;
};

export default () => {
    let instance = getAnInstance();
    instance.apiError = false;
    instance.$el.id = instance._uid
    const childs = document.getElementsByClassName('loading');
    for (let i = childs.length - 1; i >= 0; i--) {
        document.body.removeChild(childs[i]);
    }
    document.body.appendChild(instance.$el);
    return instance;
};
