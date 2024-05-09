<!-- 详情显示 -->
<template>
    <!-- <label>{{ simData.attr[0].Res }}</label> -->
    <a-flex>
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="1" :WCData="simData.attr[0]"
            :ENDatas="simData.stru[0]" :RLDatas="simData.rel[0]" :nameDatas="simData.name[0]"
            :chosenId="this.chosenId"
            :simMix="simData.sim_mix[0].Sim" :MaxSims="getMaxSims" @ListClick="handleListClick" @FGIDClick="handleFGClick"/>
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="2" :WCData="simData.attr[1]"
            :ENDatas="simData.stru[1]" :RLDatas="simData.rel[1]" :nameDatas="simData.name[1]"
            :chosenId="this.chosenId"
            :simMix="simData.sim_mix[1].Sim" :MaxSims="getMaxSims" @ListClick="handleListClick" @FGIDClick="handleFGClick"/>
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="3" :WCData="simData.attr[2]"
            :ENDatas="simData.stru[2]" :RLDatas="simData.rel[2]" :nameDatas="simData.name[2]"
            :chosenId="this.chosenId"
            :simMix="simData.sim_mix[2].Sim" :MaxSims="getMaxSims" @ListClick="handleListClick" @FGIDClick="handleFGClick"/>
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="4" :WCData="simData.attr[3]"
            :ENDatas="simData.stru[3]" :RLDatas="simData.rel[3]" :nameDatas="simData.name[3]"
            :chosenId="this.chosenId"
            :simMix="simData.sim_mix[3].Sim" :MaxSims="getMaxSims" @ListClick="handleListClick" @FGIDClick="handleFGClick"/>
        <cardView v-if="simData && simData.name" :style="{ flex: 1 }" assignId="5" :WCData="simData.attr[4]"
            :ENDatas="simData.stru[4]" :RLDatas="simData.rel[4]" :nameDatas="simData.name[4]"
            :chosenId="this.chosenId"
            :simMix="simData.sim_mix[4].Sim" :MaxSims="getMaxSims" @ListClick="handleListClick" @FGIDClick="handleFGClick"/>
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
            chosenId: null,
        }
    },
    mounted() {
        // console.log(this.ENDatas);
    },
    // updated() {
    //     console.log(this.testData)
    // },
    methods: {
        handleListClick(rowData) {  // 监听行被点击事件 
            this.chosenId = rowData.selectList;
            // console.log(rowData.selectList)
            this.$emit('ListClick', rowData); // 将点击行的数据存储到 selectedRowData 中
        },
        handleFGClick(data) {
            this.$emit('FGIDClick', data)
        }
    },
    computed: {
        getMaxSims() {
            const res = [];
            // if (this.simData.name && this.simData.name && this.simData.name[0]) {
                res.push(Math.max(this.simData.name[0].Sim, this.simData.name[1].Sim, this.simData.name[2].Sim, this.simData.name[3].Sim));
                res.push(Math.max(this.simData.attr[0].Sim, this.simData.attr[1].Sim, this.simData.attr[2].Sim, this.simData.attr[3].Sim));
                res.push(Math.max(this.simData.stru[0].Sim, this.simData.stru[1].Sim, this.simData.stru[2].Sim, this.simData.stru[3].Sim));
                res.push(Math.max(this.simData.rel[0].Sim, this.simData.rel[1].Sim, this.simData.rel[2].Sim, this.simData.rel[3].Sim));
            // }
            return res;
        }
    }
}
</script>