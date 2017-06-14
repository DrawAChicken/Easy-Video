<template>
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    created() {
        console.log(1)
        this.$remoteApi.classList('http://z.qukansha.com/?s=vod-show-id-1.html', data => {
            console.log(data);
        })
    }
};
</script>

<style lang="scss" scoped>
</style>
