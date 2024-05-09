<!-- 一列显示的卡片 -->
<template>
  <a-flex vertical class="card">
    <!-- 卡片头 -->
    <a-flex class="block">
      <label :style="{ flex: 1 }" align="center">
        {{ "Pair" + this.assignId }}
      </label>
      <label align="right" style="margin-right: 10px">
        {{ "相似性: " + simMix.toFixed(2) }}
      </label>
    </a-flex>
    <!-- 名称 -->
    <a-flex class="block">
      <simView class="block c0" :sim="this.nameDatas.Sim" :row="0" :maxSim="this.MaxSims[0]" />
      <a-flex class="block c1" justify="space-around" align="center">
        <label>
          {{ this.nameDatas.Res[0] }}
        </label>
      </a-flex>
      <a-flex class="block c2" justify="space-around" align="center">
        <label>
          {{ this.nameDatas.Res[1] }}
        </label>
      </a-flex>
    </a-flex>
    <!-- 属性 -->
    <a-flex class="block">
      <simView @click="() => showModal()" class="block c0" :sim="WCData.Sim" :row="1" :maxSim="this.MaxSims[1]" />
      <WCView @click="() => showModal()" class="block c1" :assignId="assignId + 'Left'" :data="WCData" />
      <WCView @click="() => showModal()" class="block c2" :assignId="assignId + 'Right'" :data="WCData" />
    </a-flex>
    <!-- 实体列表 -->
    <div class="block">
      <div class="sort-wrap block">
        <SwapOutlined :rotate="90" :style="{ color: '#666' }" @click="changeEntityAscend"/>
      </div>
      <a-flex>
        <simView class="block c0" :sim="ENDatas.Sim" :row="2" :maxSim="this.MaxSims[2]" />
        <listView class="block c1" :assignId="assignId + 'Left'" :data="ENDatas" :isNode="true" :isAscend="this.entityAscend" @click="handleClick"/>
        <listView class="block c2" :assignId="assignId + 'Right'" :data="ENDatas" :isNode="true" :isAscend="this.entityAscend" @click="handleClick"/>
      </a-flex>
    </div>

    <!-- 边列表 -->
    <div class="block">
      <div class="sort-wrap block">
        <SwapOutlined :rotate="90" :style="{ color: '#666' }" @click="changeEdgeAscend"/>
      </div>
      <a-flex>
        <simView class="block c0" :sim="RLDatas.Sim" :row="3" :maxSim="this.MaxSims[3]" />
        <listView class="block c1" :assignId="assignId + 'Left'" :data="RLDatas" :isNode="false" :isAscend="this.edgeAscend" @click="handleClick"/>
        <listView class="block c2" :assignId="assignId + 'Right'" :data="RLDatas" :isNode="false" :isAscend="this.edgeAscend" @click="handleClick"/>
      </a-flex>
    </div>
    <!-- 弹窗 -->
    <a-modal v-model:open="open" width="600px" title="词云" @ok="handleOk" @cancel="handleOk">
      <a-flex class="block modal-wrap">
        <simViewMedia class="block c0" :sim="sim[2]" :row="1" :maxSim="maxSim[1]" />
        <WCView class="block c1" :isModal="true" :assignId="assignId + 'Left'" :data="WCData" />
        <WCView class="block c1" :isModal="true" :assignId="assignId + 'Right'" :data="WCData" />
      </a-flex>
    </a-modal>
  </a-flex>
</template>

<script>
import WCView from "./WCView.vue";
import listView from "./listView.vue";
import simView from "./simView.vue";
import simViewMedia from "./simViewMedia.vue";
import { SwapOutlined } from "@ant-design/icons-vue";
export default {
  name: "cardView",
  props: {
    assignId: String, // 指定的ID
    WCData: null, // 词云的数据
    ENDatas: null, // 实体列表的数据
    RLDatas: null, // 边列表的数据
    nameDatas: null,  // 名称信息
    simMix: null, // 融合相似性
    MaxSims: null,  // 最大的相似性
  },
  components: {
    WCView,
    listView,
    simView,
    simViewMedia,
    SwapOutlined,
  },
  data() {
    return {
      // TODO: 死数据：最大相似性
      maxSim: [0.88, 0.76, 0.8, 1.0],
      open: false,
      entityAscend: true,
      edgeAscend: true,
    };
  },
  mounted() {
    // console.log(this.RLDatas)
  },
  methods: {
    showModal() {
      this.open = true;
      //this.modalAssignId = assign;
    },

    handleOk() {
      this.open = false;
    },

    changeEntityAscend() {  // 更改实体列表的方向
      this.entityAscend = !this.entityAscend;
    },

    changeEdgeAscend() {  // 更改边列表的方向
      this.edgeAscend = !this.edgeAscend;
    },

    handleClick(rowData) {  // 监听行被点击事件 
      this.$emit('click', rowData); // 将点击行的数据存储到 selectedRowData 中
    }
  }
};
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

.card:hover {
  border: 3px solid blue;
}

/* 砖块 */
.block {
  border: 0.5px solid #ccc;
  overflow: hidden;
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

.sort-wrap {
  display: flex;
  height: 15px;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
}

.modal-wrap {
  width: 100%;
  height: 150px;
}
</style>