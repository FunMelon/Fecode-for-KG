<template>
    <a-flex justify="space-around" align="center">
            <label align="center">
                选择数据集：
            </label>
            <a-select
                v-model:value="value1">
                <a-select-option value="ZH">ZH_EN_15K</a-select-option>
                <a-select-option value="JA">JA_EN_15K</a-select-option>
                <a-select-option value="FR">FR_EN_15K</a-select-option>
            </a-select>
        </a-flex>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref('ZH');
</script>