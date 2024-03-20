<template>
    <div :id=this.assignId />
</template>

<script>
import G6 from '@antv/g6';
// import { watch } from 'vue';

export default {
    name: "FView",
    props: {
        assignId: String,
        data: null,
    },
    data() {
        return {
            graph: null
        }
    },
    mounted() {
        this.setupG6();
        // watch(() => this.data, (newVal, oldVal) => {
        //     console.log(`Items count changed from ${oldVal.length} to ${newVal.length}`);
        //     this.setupG6();
        // }, { deep: true });
    },
    methods: {
        setupG6() {
            if (this.graph) {
                this.graph.clear();
            }
            const data = {
            "nodes": [
                    { "id": "6543", "label": "古巴", "style": { "fill": "#3333" } },
                    { "id": "16871" },
                    { "id": "18980" },
                    { "id": "12088" },
                    { "id": "8328" },
                    { "id": "19748" },
                    { "id": "19313" },
                    { "id": "19983" },
                    { "id": "7808" },
                    { "id": "8352" },
                    { "id": "11708" },
                    { "id": "14860" },
                    { "id": "21530" },
                    { "id": "7907" },
                    { "id": "17866" },
                    { "id": "21530" },
                    { "id": "23390" },
                    { "id": "18980" },
                    { "id": "17866" },
                    { "id": "18980" }
                ],
                "edges": [
                    { "source": "6543", "target": "16871" },
                    { "source": "6543", "target": "18980" },
                    { "source": "6543", "target": "12088" },
                    { "source": "6543", "target": "8328" },
                    { "source": "6543", "target": "19748" },
                    { "source": "6543", "target": "19313" },
                    { "source": "6543", "target": "19983" },
                    { "source": "6543", "target": "7808" },
                    { "source": "6543", "target": "8352" },
                    { "source": "6543", "target": "11708" },
                    { "source": "6543", "target": "14860" },
                    { "source": "6543", "target": "21530" },
                    { "source": "6543", "target": "7907" },
                    { "source": "6543", "target": "17866" },
                    { "source": "6543", "target": "21530" },
                    { "source": "6543", "target": "23390" },
                    { "source": "6543", "target": "18980" },
                    { "source": "6543", "target": "17866" },
                    { "source": "6543", "target": "18980" }
                ]
        }
            this.graph = new G6.Graph({
                container: this.assignId,
                fitView: true,
                minZoom: 0.001,
                fitViewPadding: [10, 10, 10, 10],
                defaultNode: {
                    size: 25,
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
            
            data.nodes.forEach((node) => {
                if (node.id == 6543) {
                    if (!node.style) node.style = {};
                    node.style.fill = "#3333"
                }
            })

            // console.log(JSON.stringify (this.data));
            this.graph.data(data);
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