<!-- 力导向图 -->
<template>
  <label>{{ testData }}</label>
  <div :id="this.assignId" />
</template>

<script>
import G6 from "@antv/g6";
import { watch } from "vue";

export default {
  name: "FView",
  props: {
    assignId: String, // 指定的ID
    FGData: {
      // 力导向图数据
      nodes: [],
      edges: [],
    },
    testData: null,
  },
  data() {
    return {
      graph: null,
    };
  },
  mounted() {
    watch(
      () => this.FGData,
      () => {
        this.setupG6();
      },
      { deep: true }
    );
  },
  methods: {
    setupG6() {
      if (this.graph) {
        this.graph.clear();
      }

      this.graph = new G6.Graph({
        container: this.assignId,
        fitView: true,
        minZoom: 0.001,
        fitViewPadding: [10, 10, 10, 10],
        defaultNode: {
          size: 25,
          style: {
            fill: "#E0E0E0",
          },
          labelCfg: {
            style: {
              fontSize: 8,
            },
          },
        },
        defaultEdge: {
          style: {
            endArrow: true,
          },
        },
        layout: {
          type: "forceAtlas2",
          preventOverlap: true,
        },
        animate: true,
      });

      // 监听节点的鼠标移入事件，显示 tooltips
      this.graph.on("node:mouseenter", (evt) => {
        const node = evt.item;
        const model = node.getModel();
        const tooltipText = `ID: ${model.id}<br/>Name: ${model.name}`;
        if (tooltipText) {
          this.showTooltip(evt.clientX, evt.clientY, tooltipText);
        }
      });

      // 监听节点的鼠标移出事件，隐藏 tooltips
      this.graph.on('node:mouseleave', () => {
        this.hideTooltip();
      });

      this.graph.on('node:mouseleave', () => {
      this.hideTooltip();
    });

      // console.log(JSON.stringify (this.data));
      this.graph.data(JSON.parse(JSON.stringify(this.FGData))); // 此处会修改data，因此必须使用深拷贝
      this.graph.render();
    },

    showTooltip(x, y, text) {
      // 创建 tooltip 元素
      const tooltipElement = document.createElement('div');
      tooltipElement.style.position = 'absolute';
      tooltipElement.style.left = x + 'px';
      tooltipElement.style.top = y + 'px';
      tooltipElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      tooltipElement.style.color = '#fff';
      tooltipElement.style.padding = '5px';
      tooltipElement.textContent = text;
      tooltipElement.innerHTML = text;

      // 将 tooltip 元素添加到容器中
      document.body.appendChild(tooltipElement);

      // 存储 tooltip 元素的引用，以便在需要时移除
      this.tooltipElement = tooltipElement;
    },

    hideTooltip() {
      // 移除 tooltip 元素
      if (this.tooltipElement) {
        document.body.removeChild(this.tooltipElement);
        this.tooltipElement = null;
      }
    }
  },
};
</script>

<style>
/* 提示框的样式 */
.g6-tooltip {
  offset: 0;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}

#mountNode {
  width: 100%;
  height: 100%;
}
</style>