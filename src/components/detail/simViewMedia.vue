<!-- 显示相似度占比 -->
<template>
    <svg>
        <!-- 上方矩形 -->
        <!-- <rect x="0" y="0" width="100%" :height="topHeight" fill="red" /> -->
        <!-- 下方矩形 -->
        <rect x="0" :y="topHeight" width="100%" :height="downHeight" :fill="getColor" />
        <line x1="0" y1=150 x2="150" y2="150" style="stroke:rgb(1,1,1); stroke-width:0.5" stroke-dasharray="4, 2" />
        <line x1="0" :y1="maxHeight" x2="150" :y2="maxHeight" style="stroke:rgb(100,1,1); stroke-width:1"
            stroke-dasharray="4, 2" />
    </svg>
</template>

<script>
export default {
    props: {
        sim: Number,  // 相似度
        row: Number,  // 代表是卡片的第几行，用来确定配色
        maxSim: Number,  // 代表改行的最大相似度
    },
    computed: {
        maxHeight() {
            return (1 - this.maxSim) * 150;
        },
        topHeight() {
            return (1 - this.sim) * 150;
        },
        downHeight() {
            return this.sim * 150;
        },
        getColor() {
            if (this.row == 0) {
                return '#FEF1CE';
            } else if (this.row == 1) {
                return '#EAE2FE';
            } else if (this.row == 2) {
                return '#DFF5E5';
            } else {
                return '#EFF4FF';
            }
        }
    },
};
</script>

<style scoped>
svg {
    width: 100%;
    /* height: 100%; */
    max-height: 150px;
    padding-bottom: 0;
    /* background-color: black; */
}
</style>