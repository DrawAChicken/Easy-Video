import Vue from 'vue';

const LoadingConstructor = Vue.extend(require('./loading.vue'));

let getAnInstance = () => {
    return new LoadingConstructor({
        el: document.createElement('div')
    })
}
LoadingConstructor.prototype.errorMsg = function (opt) {
    this.apiError = true
}
LoadingConstructor.prototype.close = function () {
    if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
}
let Loading = (opt) => {
    let instance = getAnInstance();
    instance.message = opt.msg || '';
    opt.el.appendChild(instance.$el);
    return instance;
}
export default Loading;
