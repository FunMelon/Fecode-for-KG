<!-- 详情显示 -->
<template>
    <!-- <label>{{ simData.attr[0].Res }}</label> -->
    <a-flex>
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="1" 
            :WCData="simData.attr[0]" 
            :ENDatas="simData.stru[0]"
            :RLDatas="simData.rel[0]"
            :ZHName="simData.name[0].Res[0]" :ENName="simData.name[0].Res[1]" 
            :sim="sim[0]" :simMix="simData.sim_mix[0].Sim"
            @hover="handleHover" />
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="2" 
            :WCData="simData.attr[1]" 
            :ENDatas="simData.stru[1]"
            :RLDatas="simData.rel[1]"
            :ZHName="simData.name[1].Res[0]" :ENName="simData.name[1].Res[1]"
            :sim="sim[1]" :simMix="simData.sim_mix[1].Sim"
            @hover="handleHover" />
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="3" 
            :WCData="simData.attr[2]" 
            :ENDatas="simData.stru[2]"
            :RLDatas="simData.rel[2]"
            :ZHName="simData.name[2].Res[0]" :ENName="simData.name[2].Res[1]"
            :sim="sim[2]" :simMix="simData.sim_mix[2].Sim"
            @hover="handleHover" />
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="4" 
            :WCData="simData.attr[3]"  
            :ENDatas="simData.stru[3]"
            :RLDatas="simData.rel[3]"
            :ZHName="simData.name[3].Res[0]" :ENName="simData.name[3].Res[1]" 
            :sim="sim[3]" :simMix="simData.sim_mix[3].Sim"
            @hover="handleHover" />
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="5" 
            :WCData="simData.attr[4]"  
            :ENDatas="simData.stru[4]"
            :RLDatas="simData.rel[4]"
            :ZHName="simData.name[4].Res[0]" :ENName="simData.name[4].Res[1]" 
            :sim="sim[4]" :simMix="simData.sim_mix[4].Sim"
            @hover="handleHover" />
    </a-flex>
</template>

<script>
import cardView from './cardView.vue'

export default {
    name: 'detailView',
    props: {
        simData: null,
    },
    components: {
        cardView
    },
    data() {
        return {
            sim: [ // TODO:死数据，相似度
                [0.821, 0.88, 0.76, 0.80, 1],
                [0.733, 0.77, 0.68, 0.75, 0.79],
                [0.726, 0.67, 0.73, 0.74, 0.96],
                [0.724, 0.71, 0.72, 0.75, 0.65],
                [0.692, 0.64, 0.69, 0.73, 0.75]
            ],
        }
    },
    mounted() {
        // console.log(this.ENDatas);
    },
    // updated() {
    //     console.log(this.testData)
    // },
    methods: {
        handleHover(rowData) {  // 监听行被点击事件 
            this.$emit('hover', rowData); // 将点击行的数据存储到 selectedRowData 中
        }
    }
}
</script>