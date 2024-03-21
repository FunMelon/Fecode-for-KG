<!-- 词云图 -->
<template>
    <div :id=this.assignId />
</template>

<script>
import { WordCloud } from '@antv/g2plot';
import { watch } from 'vue';
export default {
    name: "LWCView",
    mounted() {
        setTimeout(() => {
            this.setupG2();
        }, 500);

        watch(() => this.data, () => {
            this.setupG2();
        }, { deep: true });
    },
    data() {
        return {
            WordCloud: null
        }
    },
    props: {
        assignId: String,
        data: null,
    },
    methods: {
        setupG2() {
            if(this.WordCloud) {
                this.WordCloud.clear();
            }

            var data;
            if (this.assignId[1] == 'L' ) {
                data = this.data[this.assignId[0] - 1][0];
                console.log("左侧")
            } else {
                data = this.data[this.assignId[0] - 1][1];
                console.log("右侧")
            }
            

            this.wordCloud = new WordCloud(this.assignId, {
                data,
                wordField: 'x',
                weightField: 'value',
                colorField: 'category',
                forceFit: true,
                wordStyle: {
                    fontFamily: 'Verdana',
                    fontSize: [5, 15],
                    rotation: 0,
                },
                spiral: 'archimedean',
                // 设置交互类型
                interactions: [{ type: 'element-active' }],
                state: {
                    active: {
                        // 这里可以设置 active 时的样式
                        style: {
                            lineWidth: 3,
                        },
                    },
                },
                random: () => 0.5,
            });

            this.wordCloud.render();
        }
    }
}
</script>

<style scoped>
#LWCNode {
    width: 100%;
    height: 100%;
}
</style>