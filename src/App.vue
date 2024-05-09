<template>
  <!-- 整个网页 -->
  <a-flex vertical class="whole">
    <!-- 上侧 -->
    <a-flex class="block" :style="{ flex: 1 }">
      <selectView class="block" :style="{ flex: 1 }" />
      <menuView class="block" :style="{ flex: 5 }" @start-click="handleStartClick" />
    </a-flex>
    <!-- 下侧 -->
    <a-flex class="block" :style="{ flex: 13 }">
      <!-- 表格 -->
      <KGTable class="block" :style="{ flex: 1 }" :data="tlbData" @row-click="handleRowClick" />
      <a-flex vertical class="block" :style="{ flex: 5 }">
        <!-- 详细视图 -->
        <detailView :simData="simData" @ListClick="handleListClick" @FGIDClick="handleFGIDClick" />
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

export default {
  components: {
    detailView,
    FView,
    KGTable,
    selectView,
    menuView,
  },
  data() {
    return {
      tlbData: null,
      simData: null,
      FGDataL: null,
      FGDataR: null,
      followNodes: null,
      FGID1: null,
      FGID2: null,
    }
  },
  methods: {
    startFollow(data) {
      this.followNodes = data;
    },

    async handleStartClick(round) {
      this.tlbData = await getTlbData(round)
    },

    async handleRowClick(rowData) {  // 监听行被点击事件 
      // 监听子组件的行点击事件，并接收传递过来的行数据
      this.simData = await getSimData(rowData.ID1); // 将点击行的数据存储到 selectedRowData 中
    },

    async refreshFG(id1, id2) {
      this.FGID1 = id1
      this.FGID2 = id2
      const data = await getFGData(id1, id2)
      this.FGDataL = data[0]
      this.FGDataR = data[1]
    },

    async handleListClick(listData) {
      // console.log(listData)
      const id1 = listData.record.IDPair.ID1
      const id2 = listData.record.IDPair.ID2
      if (id1 != this.FGID1 || id2 != this.FGID2) {
        this.refreshFG(id1, id2)
      }
    },

    async handleFGIDClick(FGIDData) {
      console.log("换新图")
      this.refreshFG(FGIDData.ID1, FGIDData.ID2)
    },
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
