<!-- 详情显示 -->
<template>
    <a-flex>
        <cardView :style="{ flex: 1 }" assignId="1" :WCData="WCDatas" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="2" :WCData="WCDatas" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="3" :WCData="WCDatas" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="4" :WCData="WCDatas" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="5" :WCData="WCDatas" :tlbData="tlbData"/>
    </a-flex>
</template>

<script>
import cardView from './cardView.vue'

export default {
    name: 'detailView',
    props: {
        WCDatas: null,
        tlbData: null,
    },
    components: {
        cardView
    },
    mounted() {
        console.log(this.WCDatas);
    }
}
</script>