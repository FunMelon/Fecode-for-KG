<template>
  <!-- 整个网页 -->
  <a-flex class="whole" >
    <!-- 左侧 -->
    <a-flex class="left block" :style="{ flex: 1 }">
      侧边
    </a-flex>
    <!-- 右侧 -->
    <a-flex class="right block" vertical :style="{ flex: 5 }">
      <!-- 顶部 -->
      <a-flex class="top block" :style="{ flex: 1 }">
        顶部
      </a-flex>
      <!-- 中部 -->
      <a-flex class="middle block" :style="{ flex: 5 }">
        中部
      </a-flex>
      <!-- 下部 -->
      <a-flex class="down block" :style="{ flex: 3 }">
        下部
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<script>

</script>

<style>
/* 砖块，为了更加美观 */
.block {
  padding: 3px;
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

/* 侧边栏 */
.left {

}

/* 主要内容栏 */
.right {

}

/* 顶部 */
.top {

}

.middle {

}

.down {

}
</style>
