<template>
    <div>
        <webview id="foo" :src="info.url" plugins useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36">
        </webview>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: ''
        };
    },
    methods: {
        getInfo() {
            this.$remoteApi.getVideo(this.$route.query.url, this)
                .then(data => {
                    this.info = data;
                })
        }
    },
    mounted() {
        this.getInfo();
    }
};
</script>

<style lang="scss" scoped>
#foo {
    width: 100%;
    height: 100%;
}

.main-content {
    width: 100%;
    height: 100%;
}
</style>
