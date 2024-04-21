<!-- 词云图 -->
<template>
  <div :id="this.isModal ? 'pp' + this.assignId : this.assignId" />
</template>

<script>
import { WordCloud } from "@antv/g2plot";
import { watch } from "vue";
export default {
  name: "LWCView",
  mounted() {
    // console.log(this.assignId);
    this.setupG2();
    watch(
      () => this.data,
      () => {
        //console.log(this.data, this.assignId);
        // console.log("发生更改")
        this.setupG2();
      },
      { deep: true }
    );
  },
  data() {
    return {
      WordCloud: null,
    };
  },
  props: {
    assignId: String, // 指定的ID
    data: null, // 数据
    isModal: Boolean,
  },
  methods: {
    setupG2() {
      // console.log("渲染")
      if (this.WordCloud) {
        this.WordCloud.clear();
      }
      // console.log(this.assignId);

      // 确定渲染那边的数据

      var data;
      try {
        if (this.assignId[1] == "L") {
          data = this.data[this.assignId[0] - 1][0];
        } else {
          data = this.data[this.assignId[0] - 1][1];
        }
      } catch (e) {
        return;
      }

      this.wordCloud = new WordCloud(
        this.isModal ? "pp" + this.assignId : this.assignId,
        {
          data,
          wordField: "x",
          weightField: "value",
          colorField: "category",
          forceFit: true,
          wordStyle: {
            fontFamily: "Verdana",
            fontSize: [5, 30],
            rotation: 0,
          },
          spiral: "archimedean",
          // 设置交互类型
          interactions: [{ type: "element-active" }],
          state: {
            active: {
              // 这里可以设置 active 时的样式
              style: {
                lineWidth: 1,
              },
            },
          },
          random: () => 0.5,
        }
      );
      // console.log("加载词云前");
      this.wordCloud.render();
      // console.log("加载词云后");
    },
  },
};
</script>

<style scoped>
#LWCNode {
  width: 100%;
  height: 100%;
}
</style>