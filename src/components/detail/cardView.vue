<!-- 一列显示的卡片 -->
<template>
    <a-flex vertical class="card">
        <!-- 卡片头 -->
        <a-flex class="block" :style="{ flex: 1 }">
            <label :style="{ flex: 1 }" align="center">
                {{ "Pair" + this.assignId }}
            </label>
            <label :style="{ flex: 1 }" align="center">
                相似性
            </label>
        </a-flex>
        <!-- 名称 -->
        <a-flex class="block" :style="{ flex: 2 }">
            <simView class="block c0" :sim=0.9 :row=0 />
            <a-flex class="block c1" justify="space-around" align="center">
                <label>
                    实体名
                </label>
            </a-flex>
            <a-flex class="block c2" justify="space-around" align="center">
                <label>
                    实体名
                </label>
            </a-flex>
        </a-flex>
        <!-- 属性 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <simView class="block c0" :sim=0.9 :row=1 />
            <WCView class="block c1" :assignId="assignId + 'Left'" :data="WCData"/>
            <WCView class="block c2" :assignId="assignId + 'Right'" :data="WCData"/>
        </a-flex>
        <!-- 实体列表 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <simView class="block c0" :sim=0.9 :row=2 />
            <listView class="block c1" :data="tlbData" :isNode=true />
            <listView class="block c2" :data="tlbData" :isNode=true />
        </a-flex>
        <!-- 边列表 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <simView class="block c0" :sim=0.9 :row=3 />
            <listView class="block c1" :data="tlbData" :isNode=false />
            <listView class="block c2" :data="tlbData" :isNode=false />
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
        assignId: String,
        WCData: null,
        tlbData: null,
    },
    components: {
        WCView,
        listView,
        simView,
    },
    mounted() {
        console.log(this.WCData)
    }
}
</script>

<style scoped>
label {
    display: flex;
    justify-content: "space-around";
    align-items: center;
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