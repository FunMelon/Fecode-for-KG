<!-- 一列显示的卡片 -->
<template>
  <a-flex vertical class="card" :style="{ border: highlighted ? '3px solid blue' : 'none' }" @click="$emit('click')">
    <!-- 卡片头 -->
    <a-flex class="block">
      <label @click="handleFGIDClick" :style="{ flex: 1 }" align="center">
        {{ "Pair" + this.assignId }}
      </label>
      <label @click="handleFGIDClick" align="right" style="margin-right: 10px">
        {{ "相似性: " + simMix.toFixed(2) }}
      </label>
    </a-flex>
    <!-- 名称 -->
    <a-flex class="block">
      <simView class="block c0" :sim="this.nameDatas.Sim" :row="0" :maxSim="this.MaxSims[0]" @click="handleFGIDClick" />
      <a-flex class="block c1" justify="space-around" align="center">
        <label @click="handleFGIDClick" style="font-size: large;">
          {{ this.nameDatas.Res[0] }}
        </label>
      </a-flex>
      <a-flex class="block c2" justify="space-around" align="center">
        <label @click="handleFGIDClick" style="font-size: large;">
          {{ this.nameDatas.Res[1] }}
        </label>
      </a-flex>
    </a-flex>
    <!-- 属性 -->
    <a-flex class="block">
      <simView class="block c0" :sim="WCData.Sim" :row="1" :maxSim="this.MaxSims[1]" :width="800" :height="600" />
      <WCView @click="showWC()" class="block c1" :assignId="assignId + 'Left'" :data="WCData" />
      <WCView @click="showWC()" class="block c2" :assignId="assignId + 'Right'" :data="WCData" />
    </a-flex>
    <!-- 实体列表 -->
    <div class="block">
      <div class="sort-wrap block">
        <a-button @click="showEN()">显示更多</a-button>
        <SwapOutlined :rotate="90" :style="{ color: '#666' }" @click="changeEntityAscend" />
      </div>
      <a-flex>
        <simView class="block c0" :sim="ENDatas.Sim" :row="2" :maxSim="this.MaxSims[2]" />
        <listView class="block c3" :assignId="assignId + 'Ent'" :data="ENDatas" :isNode="true" :chosenId="this.chosenId"
          :isAscend="this.entityAscend" @listClick="handleListClick" />
      </a-flex>
    </div>

    <!-- 边列表 -->
    <div class="block">
      <div class="sort-wrap block">
        <a-button @click="showRL()">显示更多</a-button>
        <SwapOutlined :rotate="90" :style="{ color: '#666' }" @click="changeEdgeAscend" />
      </div>
      <a-flex>
        <simView class="block c0" :sim="RLDatas.Sim" :row="3" :maxSim="this.MaxSims[3]" />
        <listView class="block c3" :assignId="assignId + 'Rel'" :data="RLDatas" :isNode="false"
          :chosenId="this.chosenId" :isAscend="this.edgeAscend" @listClick="handleListClick" />
      </a-flex>
    </div>
    <!-- 弹窗 -->
    <a-modal v-model:open="WCOpen" title="词云" @ok="handleOk" @cancel="handleOk">
      <a-flex class="block modal-wrap">
        <WCView class="block c1" :isModal="true" :assignId="assignId + 'Left'" :data="WCData" />
        <WCView class="block c1" :isModal="true" :assignId="assignId + 'Right'" :data="WCData" />
      </a-flex>
    </a-modal>

    <a-modal v-model:open="ENOpen" title="实体" @ok="handleOk" @cancel="handleOk">
      <SwapOutlined :rotate="90" :style="{ color: '#666' }" @click="changeEntityAscend" />
      <listView class="block c3" :isModal="true" :assignId="assignId + 'EntPop'" :data="ENDatas" :isNode="true"
        :chosenId="this.chosenId" :isAscend="this.entityAscend" @listClick="handleListClick" />
    </a-modal>

    <a-modal v-model:open="RLOpen" title="属性" @ok="handleOk" @cancel="handleOk">
      <SwapOutlined :rotate="90" :style="{ color: '#666' }" @click="changeEdgeAscend" />
      <listView class="block c3" :isModal="true" :assignId="assignId + 'Rel'" :data="RLDatas" :isNode="false"
        :chosenId="this.chosenId" :isAscend="this.edgeAscend" @listClick="handleListClick" />
    </a-modal>
  </a-flex>
</template>

<script>
import WCView from "./WCView.vue";
import listView from "./listView.vue";
import simView from "./simView.vue";
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
    chosenId: String,  // 当前显示的列表页面的id
    highlightedId: null,
  },
  components: {
    WCView,
    listView,
    simView,
    SwapOutlined,
  },
  watch: {
    highlightedId(newId) {
      if (newId == this.assignId) {
        this.highlighted = true;
      } else {
        this.highlighted = false;
      }
    }
  },
  data() {
    return {
      WCOpen: false,
      ENOpen: false,
      RLOpen: false,
      entityAscend: false,
      edgeAscend: false,
      highlighted: false,
    };
  },
  methods: {
    showWC() {
      this.WCOpen = true;
      //this.modalAssignId = assign;
    },
    showEN() {
      this.ENOpen = true;
    },
    showRL() {
      this.RLOpen = true;
    },
    handleOk() {
      this.WCOpen = this.ENOpen = this.RLOpen = false;
    },

    changeEntityAscend() {  // 更改实体列表的方向
      this.entityAscend = !this.entityAscend;
    },

    changeEdgeAscend() {  // 更改边列表的方向
      this.edgeAscend = !this.edgeAscend;
    },

    handleListClick(rowData) {  // 监听行被点击事件 
      rowData.ENDatas = this.ENDatas
      this.$emit('ListClick', rowData); // 将点击行的数据存储到 selectedRowData 中
    },

    handleFGIDClick() {
      this.$emit('FGIDClick', {
        nameDatas: this.nameDatas,
        ENDatas: this.ENDatas,
        Pos: this.assignId
      })
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

.c3 {
  flex: 8
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
  height: 300px;
}
</style>