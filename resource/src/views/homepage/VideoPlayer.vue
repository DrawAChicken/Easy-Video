<template>
    <div>
        <webview id="foo" :src="info.url" plugins useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"></webview>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: ''
        };
    },
    mounted() {
        this.$remoteApi.getVideo(this.$route.query.url, {
            el: this.$el
        }, data => {
            this.info = data;
		})
        const foo = document.getElementById('foo');
        foo.addEventListener('did-get-response-details', function (params) {
            console.log(params)
        })
    }
};
</script>

<style lang="scss" scoped>
    #foo{
        width: 100%;
        height: 100%;
    }
    .main-content{
        width: 100%;
        height: 100%;
    }
</style>
