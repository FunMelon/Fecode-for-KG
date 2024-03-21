<template>
  <!-- 整个网页 -->
  <a-flex vertical class="whole">
    <!-- 上侧 -->
    <a-flex class="block" :style="{ flex: 1 }">
      <selectView class="block" :style="{ flex: 1 }" />
      <menuView class="block" :style="{ flex: 5 }" />
    </a-flex>
    <!-- 下侧 -->
    <a-flex class="block" :style="{ flex: 13 }">
      <!-- 表格 -->
      <KGTable class="block" :style="{ flex: 1 }" :data="tlbData" />
      <a-flex vertical class="block" :style="{ flex: 5 }">
        <!-- 详细视图 -->
        <detailView :style="{ flex: 9 }" :WCDatas="WCDatas" :tlbData="tlbData.slice(0, 5)" />
        <a-flex class="block" :style="{ flex: 5 }">
          <FView class="block" :style="{ flex: 1 }" assignId="LFView" :FGData="FGData" />
          <FView class="block" :style="{ flex: 1 }" assignId="RFView" :FGData="FGData" />
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<script>
import { getFGData, getTlbData, getWCData } from './api/utils.js';
import detailView from './components/detail/detailView.vue';
import FView from './components/down/FView.vue'
import KGTable from './components/side/KGTable.vue';
import selectView from './components/top/selectView.vue';
import menuView from './components/top/menuView.vue';
import { ref } from 'vue';

export default {
  setup() {
    const tlbData = ref([]);
    const WCDatas = ref([]);
    const FGData = ref({});
    getTlbData().then((res) => {
      tlbData.value = res;
    })
    var WCList = []
    for (var i = 1; i <= 5; ++i) {
      getWCData('WordCloud' + i + '.json').then((res) => {
        WCList.push(res);
      })
    }
    WCDatas.value = WCList;

    getFGData().then((res) => {
      FGData.value = res;
    })

    
    return { tlbData, WCDatas, FGData };
  },
  components: {
    detailView,
    FView,
    KGTable,
    selectView,
    menuView,
  }
}
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
</style>./api/utils.js
