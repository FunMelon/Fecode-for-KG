<!-- 整个的操纵按钮 -->
<template>
    <a-flex>
        <a-flex class="block" vertical :style="{ flex: 2 }">
            <a-flex :style="{ flex: 1 }">
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        名称权重
                    </label>
                    <a-slider v-model:value="nameWeight" :style="{ flex: 4 }"/>
                </a-flex>
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        属性权重
                    </label>
                    <a-slider v-model:value="attrWeight" :style="{ flex: 4 }"/>
                </a-flex>
            </a-flex>
            <a-flex :style="{ flex: 1 }">
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        结构权重
                    </label>
                    <a-slider v-model:value="struWeight" :style="{ flex: 4 }"/>
                </a-flex>
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        关系权重
                    </label>
                    <a-slider v-model:value="relWeight" :style="{ flex: 4 }" />
                </a-flex>
            </a-flex>
        </a-flex>
        <a-flex class="block" :style="{ flex: 2 }" justify="space-around" align='center'>
            <label :style="{ flex: 1 }" align="center">
                        当前进度
                    </label>
            <a-progress :percent="Number(this.round.toFixed(2))" :style="{ flex: 4 }"/>
        </a-flex>
        <a-flex class="block" :style="{ flex: 1}" justify="space-around" align='center'>
            <a-button type="primary" @click="handleStartBtnClicked">开始</a-button>
            <a-button>停止</a-button>
        </a-flex>
    </a-flex>
</template>

<script>
export default {
    data() {
        return {
            round: 0,
            nameWeight: 25,
            attrWeight: 25,
            struWeight: 25,
            relWeight: 25,
        }
    },
    methods: {
        handleStartBtnClicked() {
            this.$emit('start-click', this.round);
            this.round += 1.3;
            // this.round.toFixed(1)
        }
    }
}
</script>

<style scoped>
.block {
    border: 1px solid #ccc;
}
</style>