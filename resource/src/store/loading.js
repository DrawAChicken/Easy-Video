const state = {
    statu: 'stop'
};

const mutations = {
    setLoadingStatu(initState, val) {
        initState.statu = val;
    }
};
export default {
    state,
    mutations
}