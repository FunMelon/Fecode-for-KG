<!-- 一列显示的卡片 -->
<template>
    <a-flex vertical class="card">
        <!-- 卡片头 -->
        <a-flex class="block" :style="{ flex: 1 }">
            <label :style="{ flex: 1 }" align="center">
                {{ this.assignId }}
            </label>
            <label :style="{ flex: 1 }" align="center">
                相似性
            </label>
        </a-flex>
        <!-- 名称 -->
        <a-flex class="block" :style="{ flex: 2 }">
            <!-- TODO:使用颜色表示相似性 -->
            <label class="block c0" align="center">
                相似性
            </label>
            <label class="block c1" align="center">
                实体名
            </label>
            <label class="block c2" align="center">
                实体名
            </label>
        </a-flex>
        <!-- 属性 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <label class="block c0" align="center">
                相似度
            </label>
            <WCView class="block c1" :assignId="assignId + 'Left'" :data="WCData" />
            <WCView class="block c2" :assignId="assignId + 'Right'" :data="WCData" />
        </a-flex>
        <!-- 实体列表 -->
        <a-flex class="block" :style="{ flex: 5 }">
            <label class="block c0" align="center">
                相似性
            </label>
            <listView class="block c1" :data="tlbData" :isNode=true />
            <listView class="block c2" :data="tlbData" :isNode=true />
        </a-flex>

        <a-flex class="block" :style="{ flex: 5 }">
            <label class="block c0" align="center">
                相似性
            </label>
            <listView class="block c1" :data="tlbData" :isNode=false />
            <listView class="block c2" :data="tlbData" :isNode=false />
        </a-flex>
    </a-flex>
</template>

<script>
import WCView from './WCView.vue';
import listView from './listView.vue';

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