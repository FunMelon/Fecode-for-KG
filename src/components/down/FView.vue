<!-- 力导向图 -->
<template>
  <div :id="this.assignId" />
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "FView",
  props: {
    assignId: String, // 指定的ID
    FGData: {
      // 力导向图数据
      nodes: [],
      edges: [],
    },
    centerNodePairIds: Array,
    alignNodePairListIds: Array,
    type: String,
    followNodes: Object,
  },
  data() {
    return {
      graph: null,
    };
  },
  computed: {
    followAndGData() {
      return {
        graph: this.FGData,
        follow: this.followNodes,
      };
    },
  },
  watch: {
    FGData(data) {
      if (!data || !this.graph) return;
      if (this.type === "follow") return;
      this.graph.data(JSON.parse(JSON.stringify(this.FGData))); // 此处会修改data，因此必须使用深拷贝
      this.graph.render();
    },
    followAndGData(data) {
      if (this.type === "base") return;
      const { graph, follow } = data;
      if (!graph || !follow) return;
      this.graph.data(JSON.parse(JSON.stringify(graph))); // 此处会修改data，因此必须使用深拷贝
      this.graph.render();
    },
  },
  mounted() {
    if (this.graph) {
      this.graph.clear();
    }

    this.graph = new G6.Graph({
      container: this.assignId,
      fitView: false,
      //oom: 0.001,
      fitViewPadding: [10, 10, 10, 10],
      defaultNode: {
        size: 12,
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
        type: "force2",
        preventOverlap: true,
        nodeStrength: 50,
        linkDistance:100,
        onTick: () => {
          const nodes = this.graph.getNodes().map((item) => item.getModel());
          nodes.forEach((item) => {
            if (this.type === "base" && item.id === this.centerNodePairIds[0]) {
              item.fx = this.graph.getWidth() / 2;
              item.fy = this.graph.getHeight() / 2;
            }
            if (this.type === "follow" && this.followNodes[item.id]) {
              item.fx = this.followNodes[item.id].x;
              item.fy = this.followNodes[item.id].y;
            }
          });
        },
        onLayoutEnd: () => {
          if (this.type === "follow") {
            // TODO: follow图缩放设置
            return;
          }
          const nodes = this.graph.getNodes().map((item) => item.getModel());
          const followNodes = {};
          nodes.forEach((item) => {
            if (item.id === this.centerNodePairIds[0]) {
              followNodes[this.centerNodePairIds[1]] = {
                x: item.x,
                y: item.y,
              };
              return;
            }
            const alignNode = this.alignNodePairListIds.find(
              (ele) => ele[0] === item.id
            );
            if (alignNode) {
              followNodes[alignNode[1]] = {
                x: item.x,
                y: item.y,
              };
            }
          });
          this.$emit("startFollow", followNodes);
          // TODO: base 图 缩放设置
        },
      },
      modes: {
        default: [
          "zoom-canvas",
          "drag-node",
          "drag-canvas",
          // {
          //   type: "tooltip",
          //   formaText(model) {
          //     const text =
          //       "label: " + model.label + "<br/> class: " + model.class;
          //     return text;
          //   },
          //   offset: 10,
          // },
        ],
      },
      animate: true,
    });
  },
  methods: {},
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