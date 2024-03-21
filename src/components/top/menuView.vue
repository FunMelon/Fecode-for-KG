<template>
    <a-flex>
        <a-flex class="block" vertical :style="{ flex: 2 }">
            <a-flex :style="{ flex: 1 }">
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        名称权重
                    </label>
                    <a-slider :style="{ flex: 4 }"/>
                </a-flex>
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        属性权重
                    </label>
                    <a-slider :style="{ flex: 4 }"/>
                </a-flex>
            </a-flex>
            <a-flex :style="{ flex: 1 }">
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        结构权重
                    </label>
                    <a-slider :style="{ flex: 4 }"/>
                </a-flex>
                <a-flex :style="{ flex: 1 }" justify="space-around" align='center'>
                    <label :style="{ flex: 3 }" align="center">
                        关系权重
                    </label>
                    <a-slider :style="{ flex: 4 }" />
                </a-flex>
            </a-flex>
        </a-flex>
        <a-flex class="block" :style="{ flex: 2 }" justify="space-around" align='center'>
            <label :style="{ flex: 1 }" align="center">
                        当前进度
                    </label>
            <a-progress :percent="30" :style="{ flex: 4 }"/>
        </a-flex>
        <a-flex class="block" :style="{ flex: 1}" justify="space-around" align='center'>
            <a-button type="primary">开始</a-button>
            <a-button>停止</a-button>
        </a-flex>
    </a-flex>
</template>

<script setup>
</script>
<style scoped>
.block {
    border: 1px solid #ccc;
}
</style>