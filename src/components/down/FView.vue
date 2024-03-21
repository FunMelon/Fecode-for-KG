<!-- 力导向图 -->
<template>
    <div :id=this.assignId />
</template>

<script>
import G6 from '@antv/g6';
import { watch } from 'vue';

export default {
    name: "FView",
    props: {
        assignId: String,  // 指定的ID
        FGData: {  // 力导向图数据
            nodes: [],
            edges: [],
        },
    },
    data() {
        return {
            graph: null
        }
    },
    mounted() {
        watch(() => this.FGData, () => {
            this.setupG6()
        }, { deep: true });
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
                        fill: '#E0E0E0'
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
                modes: {
                    default: [
                        'zoom-canvas',
                        'drag-node',
                        {
                            type: "tooltip",
                            formaText(model) {
                                const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                                return text;
                            },
                            offset: 10,
                        },
                    ],
                },
                animate: true,
            });

            // console.log(JSON.stringify (this.data));
            this.graph.data(JSON.parse(JSON.stringify(this.FGData)));  // 此处会修改data，因此必须使用深拷贝
            this.graph.render()
        },
    }
}
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