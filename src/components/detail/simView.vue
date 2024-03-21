<template>
    <svg>
        <!-- 上方红色矩形 -->
        <!-- <rect x="0" y="0" width="100%" :height="redHeight" fill="red" /> -->
        <!-- 下方蓝色矩形 -->
        <rect x="0" :y="redHeight" width="100%" :height="blueHeight" :fill="getColor" />
        <line x1="0" y1=50 x2="100" y2="50" style="stroke:rgb(1,1,1); stroke-width:0.5" stroke-dasharray="4, 2" />
    </svg>
</template>

<script>
export default {
    props: {
        sim: Number,
        row: Number,
    },
    computed: {
        redHeight() {
            return (1 - this.sim) * 100;
        },
        blueHeight() {
            return this.sim * 100;
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
    max-height: 98px;
    padding: 0;
}
</style>