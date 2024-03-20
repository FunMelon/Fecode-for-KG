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
        watch(() => this.data, (newVal, oldVal) => {
            console.log(`Items count changed from ${oldVal.length} to ${newVal.length}`);
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
            const data = this.data;

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