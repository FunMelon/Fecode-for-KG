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
      <KGTable class="block" :style="{ flex: 1 }" :data="tlbData" @row-click="handleRowClick" :newRow="newRow"
        @updateData="handleUpdateData" />
      <a-flex vertical class="block" :style="{ flex: 5 }">
        <!-- 详细视图 -->
        <detailView :simData="simData" @ListClick="handleListClick" @FGIDClick="handleFGIDClick" />
        <!-- 力导向图 -->
        <a-flex class="block" :style="{ flex: 0.43 }">
          <FView class="block" :style="{ width: '50%' }" assignId="LFView" :FGData="FGDataL" type="base"
            :centerNodePairIds="this.centerNodePair" :alignNodePairListIds="this.alignNodePair"
            @startFollow="startFollow" :highlightNodeId="highlightId1" />
          <FView class="block" :style="{ width: '50%' }" assignId="RFView" type="follow" :FGData="FGDataR"
            :centerNodePairIds="this.centerNodePair" :alignNodePairListIds="this.alignNodePair"
            :followNodes="followNodes" :highlightNodeId="highlightId2" />
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
import { Modal } from 'ant-design-vue';
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
      highlightId1: null,
      highlightId2: null,
      alignNodePair: [],
      centerNodePair: [],
      newRow: null,
      round: 0,
    }
  },
  methods: {
    showLoadingModal(info) {
      Modal.info({
        title: 'Loading...',
        content: info,
        maskClosable: false,
        closable: false,
        okButtonProps: { style: { display: "none" } },
      });
    },
    startFollow(data) {
      this.followNodes = data;
    },

    handleUpdateData(data) {
      this.tlbData = data
    },

    async handleStartClick() {
      this.simData = this.FGDataL = this.FGDataR = null
      this.showLoadingModal("后端正在计算数据中")
      // console.log(this.round)
      // await new Promise(resolve => setTimeout(resolve, 5000));
      this.tlbData = await getTlbData(this.round)
      Modal.destroyAll()
      ++this.round
    },

    async handleRowClick(rowData) {  // 监听行被点击事件 
      // 监听子组件的行点击事件，并接收传递过来的行数据
      this.highlightId1 = this.highlightId2 = null
      this.FGDataL = this.FGDataR = null
      this.simData = await getSimData(rowData.ID1); // 将点击行的数据存储到 selectedRowData 中
    },

    async refreshFG(id1, id2) {
      this.FGID1 = id1
      this.FGID2 = id2
      // this.showLoadingModal("加载力导向图中，正在计算位置")
      const data = await getFGData(id1, id2)
      // Modal.destroyAll();
      if(!data) return  // 没有数据就不刷新力导向图
      this.FGDataL = data[0]
      this.FGDataR = data[1]
    },

    async handleListClick(listData) {
      // console.log(listData)
      const id1 = listData.record.IDPair.ID1;
      const id2 = listData.record.IDPair.ID2;
      if (id1 !== this.FGID1 || id2 !== this.FGID2) {
        this.alignNodePair = listData.ENDatas.alignNodePair;
        this.centerNodePair = listData.ENDatas.centerNodePair;
        await this.refreshFG(id1, id2);
      }
      setTimeout(() => {
        this.alignNodePair = listData.ENDatas.alignNodePair;
        this.centerNodePair = listData.ENDatas.centerNodePair;
        if (listData.record.left.ID1) {  // 传送的是实体列表
          this.highlightId1 = listData.record.left.ID1;
          this.highlightId2 = listData.record.right.ID2;
        } else {
          this.highlightId1 = listData.record.left.KG1
          this.highlightId2 = listData.record.right.KG2
          // console.log(listData.record.left.KG1)
          // console.log(listData.record.right.KG2)
        }
      }, 100); // 1000毫秒等于1秒
    },

    async handleFGIDClick(FGIDData) {
      // console.log("换新图")
      const index = FGIDData.Pos - 1;
      this.newRow = {
        "ID1": this.simData.sim_mix[index].ID1,
        "ID2": this.simData.sim_mix[index].ID2,
        "Sim": this.simData.sim_mix[index].Sim,
        "KG1": this.simData.name[index].Res[0],
        "KG2": this.simData.name[index].Res[1]
      };

      // console.log(newRow)
      this.alignNodePair = FGIDData.ENDatas.alignNodePair
      this.centerNodePair = FGIDData.ENDatas.centerNodePair
      // console.log(this.alignNodePair)
      // console.log(this.centerNodePair)
      this.highlightId1 = this.highlightId2 = null
      this.refreshFG(FGIDData.nameDatas.ID1, FGIDData.nameDatas.ID2)
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
