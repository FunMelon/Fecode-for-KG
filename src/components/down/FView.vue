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
    highlightNodeId: String, // 新增prop，用于接收要高亮的节点ID
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
    highlightNodeId(newId) {
      // console.log(newId)
      if (!this.graph) {  // 没有力导向图实例
        return
      } else if (newId == null) {
        // console.log("清空力导向图")
        this.graph.clear();
      } else {
        this.setNodeColors();
      }
    },
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
    centerNodePairIds() {
      this.setNodeColors()
    }
  },
  mounted() {
    if (this.graph) {
      this.graph.clear();
    }
    const tooltip = new G6.Tooltip({
      offsetX: 0,
      offsetY: 0,
      itemTypes: ['node', 'edge'],
      getContent: (e) => {
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        if (e.item.getType() === 'node') {
          outDiv.innerHTML = `
          <h4>name: ${e.item.getModel().name}</h4>
        <h4>id: ${e.item.getModel().id}</h4>
      `;
        } else if (e.item.getType() === 'edge') {
          outDiv.innerHTML = `
        <h4>rel: ${e.item.getModel().rels}</h4>
      `;
        }
        return outDiv;
      },
    });

    this.graph = new G6.Graph({
      container: this.assignId,
      plugins: [tooltip],
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
        linkDistance: 100,
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
            this.setNodeColors()
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
          this.setNodeColors()
        },
      },
      modes: {
        default: [
          "zoom-canvas",
          "drag-node",
          "drag-canvas",
        ],
      },
      animate: true,
    });
  },
  methods: {
    // 设置节点颜色
    setNodeColors() {
      setTimeout(() => {
        const nodes = this.graph.getNodes();
        // console.log(this.centerNodePairIds)
        // console.log(this.alignNodePairListIds)
        nodes.forEach(node => {
          // 灰色
          if (node.getModel().id !== this.highlightNodeId) {
            node.update({
              style: {
                fill: "#E0E0E0", // 恢复默认颜色
              },
            });
          }
          const model = node.getModel();
          if (this.centerNodePairIds && this.centerNodePairIds.includes(model.id)) {
            // 中心节点颜色为 "#EFF4FF"
            // console.log("中心节点")
            node.update({
              style: {
                fill: "#EFF4FF",
              },
            });
          } else {
            const alignNode = this.alignNodePairListIds.find(
              (pair) => pair.includes(model.id)
            );
            if (alignNode) {
              // 对齐节点颜色为 "#52C41A"
              // console.log("对齐节点")
              node.update({
                style: {
                  fill: "#52C41A",
                },
              });
            }
          }
        });
        const node = this.graph.findById(this.highlightNodeId);
        // console.log(this.highlightNodeId + "高亮节点")
        // 高亮
        if (node) {
          node.update({
            style: {
              fill: "red", // 高亮颜色
            },
          });
        }
      }, 100)
    },
  },
};
</script>

<style>
/* 提示框的样式 */
.g6-component-tooltip {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0px 10px 24px 10px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}

#mountNode {
  width: 100%;
  height: 100%;
}
</style>
