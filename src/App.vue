<template>
  <!-- 整个网页 -->
  <a-flex vertical class="whole">
    <!-- 上侧 -->
    <a-flex class="block" :style="{ flex: 1 }">
      <selectView class="block" :style="{ flex: 1 }" />
      <menuView class="block" :style="{ flex: 5 }" @start-click="handleStartClick"/>
    </a-flex>
    <!-- 下侧 -->
    <a-flex class="block" :style="{ flex: 13 }">
      <!-- 表格 -->
      <KGTable class="block" :style="{ flex: 1 }" :data="tlbData" @row-click="handleRowClick" />
      <a-flex vertical class="block" :style="{ flex: 5 }">
        <!-- 详细视图 -->
        <detailView :simData="simData" @click="handleListClick" />
        <!-- 力导向图 -->
        <a-flex class="block" :style="{ flex: 1 }">
          <FView class="block" :style="{ width: '50%' }" assignId="LFView" :FGData="FGDataL" type="base"
            :centerNodePairIds="['6661', '17161']" :alignNodePairListIds="[
              ['306', '10806'],
              ['773', '11273'],
              ['1634', '12134'],
              ['4411', '14911'],
              ['5819', '16319'],
              ['24113', '35194'],
            ]" @startFollow="startFollow" />
          <FView class="block" :style="{ width: '50%' }" assignId="RFView" type="follow" :FGData="FGDataR"
            :followNodes="followNodes" />
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<script>
import { getTlbData, getSimData, getFGData } from "./api/utils.js";
import detailView from "./components/detail/detailView.vue";
import FView from "./components/down/FView.vue";
import KGTable from "./components/side/KGTable.vue";
import selectView from "./components/top/selectView.vue";
import menuView from "./components/top/menuView.vue";
import { ref, onMounted } from "vue";

export default {
  setup() {
    // 读取Json数据
    const followNodes = ref({});
    const tlbData = ref([]);
    const simData = ref([]);
    const FGDataL = ref({});
    const FGDataR = ref({});

    function startFollow(data) {
      followNodes.value = data;
    }

    onMounted(async () => {
      // 读取表格数据
      tlbData.value = null;
      // 读取词云数据
      simData.value = null;
      // 读取力导向图数据
      FGDataL.value = null;
      FGDataR.value = null;
    });

    return { tlbData, simData, FGDataL, FGDataR, startFollow, followNodes };
  },
  components: {
    detailView,
    FView,
    KGTable,
    selectView,
    menuView,
  },
  methods: {

    async handleStartClick(round) {
      console.log(round);
      this.tlbData = await getTlbData(0)
    },

    async handleRowClick(rowData) {  // 监听行被点击事件 
      // 监听子组件的行点击事件，并接收传递过来的行数据
      this.simData = await getSimData(rowData.ID1); // 将点击行的数据存储到 selectedRowData 中
    },

    async handleListClick(listData) {
      console.log(listData)
      const data = await getFGData(listData.record.IDPair.ID1, listData.record.IDPair.ID2)
      // console.log(data)
      this.FGDataL = data[0]
      this.FGDataR = data[1]
    }
  }
};
</script>

<style scoped>
/* 砖块，为了更加美观 */
.block {
  border: 1px solid #ccc;
}

/* 整个网页，设置这个属性为了占满空间 */
.whole {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
