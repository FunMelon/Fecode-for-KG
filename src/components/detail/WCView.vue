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
      // console.log(this.WordCloud)
      if (this.WordCloud) {
        this.WordCloud.destroy();
        // console.log("清空词云")
      } else {
        // console.log("没有")
      }
      // console.log(this.assignId);

      // 确定渲染那边的数据

      var data;
      try {
        
        if (this.assignId[1] == "L") {
          data = this.data.Res[0];
        } else {
          data = this.data.Res[1];
        }
      } catch (e) {
        console.log(e);
        return;
      }

      this.WordCloud = new WordCloud(
        this.isModal ? "pp" + this.assignId : this.assignId,
        {
          data,
          wordField: "x",
          weightField: "value",
          colorField: "category",
          forceFit: true,
          wordStyle: {
            fontFamily: "Verdana",
            fontSize: this.isModal ? [15, 50]: [5, 30],
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
      this.WordCloud.render();
      // console.log("加载词云后");
    },
  },
};
</script>