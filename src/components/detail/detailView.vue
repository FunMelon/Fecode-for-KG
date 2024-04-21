<!-- 详情显示 -->
<template>
    <label>{{ testData }}</label>
    <a-flex>
        <cardView :style="{ flex: 1 }" assignId="1" :WCData="WCDatas" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName1" :sim="sim[0]"/>
        <cardView :style="{ flex: 1 }" assignId="2" :WCData="WCDatas"  :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName2" :sim="sim[1]"/>
        <cardView :style="{ flex: 1 }" assignId="3" :WCData="WCDatas"  :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName3" :sim="sim[2]"/>
        <cardView :style="{ flex: 1 }" assignId="4" :WCData="WCDatas" :ENDatas="ENDatas"
            :RLDatas="RLDatas" :ZHName="ZHName" :ENName="ENName4" :sim="sim[3]"/>
        <cardView :style="{ flex: 1 }" assignId="5" :WCData="WCDatas" :ENDatas="ENDatas"
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
        testData: null,
    },
    components: {
        cardView
    },
    data() {
        return {
            ZHName: '黑暗騎士:黎明昇起', // TODO:死数据，实体名称
            ENName1: 'The Dark Knight Rises',
            ENName4: 'Star Wars: The Clone Wars (film)',
            ENName5: 'The Hobbit: An Unexpected Journey',
            ENName2: 'Star Wars: The Force Awakens',
            ENName3: 'The Last Samurai',
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
    // }
}
</script>