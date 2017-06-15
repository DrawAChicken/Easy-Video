<template>
    <div class="loading">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
            <p class="text">
                <span v-for="item in text" :style="{'animation-delay': setDelay()}"> {{item}} </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: 'loading...'
        }
    },
    data() {
        return {
            text: []
        };
    },
    created() {
        this.text = this.message.split('');
    },
    methods: {
        setDelay() {
            return `${Math.random()}s`;
        }
    }
};
</script>

<style lang="css" scoped>
    .content-area .loading{
        transform: translateX(-5%);
    }
    .loading{
        width: 100%;
        height: 100%;
        position: absolute;
        background: #262626;
        left: 0;
        top: 0;
        z-index: 9999;
    }
    .spinner {
        width: 100%;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .text{
        width: 100%;
        font-size: 16px;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        color: #ccc;
    }
    .double-bounce1, .double-bounce2 {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -45px;
        animation: run 2.0s infinite ease-in-out;
    }
    span{
        animation: runSpan 2.0s infinite ease-in-out;
    }
    .double-bounce2 {
        animation-delay: -1.0s;
    }
    @keyframes run {
        0%, 100% {
            transform: scale(0);
        } 50% {
            transform: scale(1);
        }
    }
    @keyframes runSpan {
        0%, 100% {
            opacity: 0;
        } 50% {
            opacity: 1;
        }
    }
</style>
