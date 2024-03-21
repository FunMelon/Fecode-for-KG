<!-- 详情显示 -->
<template>
    <a-flex>
        <cardView :style="{ flex: 1 }" assignId="1" :WCData="WCDatas" :tlbData="tlbData" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName1" :sim="sim[0]"/>
        <cardView :style="{ flex: 1 }" assignId="2" :WCData="WCDatas" :tlbData="tlbData" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName2" :sim="sim[1]"/>
        <cardView :style="{ flex: 1 }" assignId="3" :WCData="WCDatas" :tlbData="tlbData" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName3" :sim="sim[2]"/>
        <cardView :style="{ flex: 1 }" assignId="4" :WCData="WCDatas" :tlbData="tlbData" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName4" :sim="sim[3]"/>
        <cardView :style="{ flex: 1 }" assignId="5" :WCData="WCDatas" :tlbData="tlbData" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName5" :sim="sim[4]"/>
    </a-flex>
</template>

<script>
import cardView from './cardView.vue'

export default {
    name: 'detailView',
    props: {
        WCDatas: null,  // 词云的数据
        ENDatas: null,  // 实体列表的数据
        RLDatas: null,  // 边列表的数据
    },
    components: {
        cardView
    },
    data() {
        return {
            ZHName: '国际米兰足球俱乐部', // TODO:死数据，实体名称
            ENName1: 'Inter Milan',
            ENName2: 'A.C. Milan',
            ENName3: 'Udinese Calcio',
            ENName4: 'Sport Club Internacional',
            ENName5: 'Calcio Catania',
            sim: [ // TODO:死数据，相似度
                [0.813, 0.84, 0.62, 0.90, 0.99],
                [0.751, 0.80, 0.69, 0.73, 0.99],
                [0.737, 0.75, 0.67, 0.76, 1.00],
                [0.725, 0.79, 0.66, 0.71, 0.89],
                [0.713, 0.83, 0.61, 0.68, 0.92]
            ],
        }
    },
    mounted() {
        // console.log(this.ENDatas);
    }
}
</script>