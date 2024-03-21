<!-- 一列显示的卡片 -->
<template>
    <a-flex vertical class="card">
        <!-- 卡片头 -->
        <a-flex class="block" :style="{ flex: 1 }">
            <label :style="{ flex: 1 }" align="center">
                {{ "Pair" + this.assignId }}
            </label>
            <label :style="{ flex: 1 }" align="center">
                {{ "相似性: " + sim[0] }}
            </label>
        </a-flex>
        <!-- 名称 -->
        <a-flex class="block" :style="{ flex: 2 }">
            <simView class="block c0" :sim="sim[1]" :row=0  :maxSim="maxSim[0]"/>
            <a-flex class="block c1" justify="space-around" align="center">
                <label>
                    {{ this.ZHName }}
                </label>
            </a-flex>
            <a-flex class="block c2" justify="space-around" align="center">
                <label>
                    {{ this.ENName }}
                </label>
            </a-flex>
        </a-flex>
        <!-- 属性 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <simView class="block c0" :sim="sim[2]" :row=1 :maxSim="maxSim[1]"/>
            <WCView class="block c1" :assignId="assignId + 'Left'" :data="WCData"/>
            <WCView class="block c2" :assignId="assignId + 'Right'" :data="WCData"/>
        </a-flex>
        <!-- 实体列表 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <simView class="block c0" :sim="sim[3]" :row=2 :maxSim="maxSim[2]"/>
            <listView class="block c1" :assignId="assignId + 'Left'" :data="ENDatas" :isNode=true />
            <listView class="block c2" :assignId="assignId + 'Right'" :data="ENDatas" :isNode=true />
        </a-flex>
        <!-- 边列表 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <simView class="block c0" :sim="sim[4]" :row=3 :maxSim="maxSim[3]"/>
            <listView class="block c1" :assignId="assignId + 'Left'" :data="RLDatas" :isNode=false />
            <listView class="block c2" :assignId="assignId + 'Right'" :data="RLDatas" :isNode=false />
        </a-flex>
    </a-flex>
</template>

<script>
import WCView from './WCView.vue';
import listView from './listView.vue';
import simView from './simView.vue';

export default {
    name: 'cardView',
    props: {
        assignId: String,  // 指定的ID
        WCData: null,  // 词云的数据
        ENDatas: null,  // 实体列表的数据
        RLDatas: null,  // 边列表的数据
        ZHName: String,  // 中文名
        ENName: String,  // 实体名
        sim: null,  // 相似度
    },
    components: {
        WCView,
        listView,
        simView,
    },
    data() {
        return {
            // TODO: 死数据：最大相似性
            maxSim: [0.84, 0.69, 0.90, 1.00],
        }
    },
    mounted() {
        // console.log(this.RLDatas)
    }
}
</script>

<style scoped>
label {
    display: flex;
    justify-content: "space-around";
    align-items: center;
    font-size: 12px;
}

/* 卡片 */
.card {
    border: 1px solid #ccc;
    padding: 2px;
}

/* 砖块 */
.block {
    border: 0.5px solid #ccc;
}

/* c加数字代表第几行，用来分配占比 */
.c0 {
    flex: 1;
}

.c1 {
    flex: 4;
}

.c2 {
    flex: 4;
}
</style>