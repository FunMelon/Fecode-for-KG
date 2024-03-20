<!-- 详情显示 -->
<template>
    <a-flex>
        <cardView :style="{ flex: 1 }" assignId="Pair1" :WCData="WCData" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="Pair2" :WCData="WCData" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="Pair3" :WCData="WCData" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="pair4" :WCData="WCData" :tlbData="tlbData"/>
        <cardView :style="{ flex: 1 }" assignId="Pair5" :WCData="WCData" :tlbData="tlbData"/>
    </a-flex>
</template>

<script>
import cardView from './cardView.vue'

export default {
    name: 'detailView',
    props: {
        WCData: null,
        tlbData: null,
    },
    components: {
        cardView
    }
}
</script>