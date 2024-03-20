<!-- 列表显示器 -->
<template>
    <a-table :columns="columns" :data-source="data" size="small" :showHeader=false :pagination=false>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'kg2' && isNode ">
                <span>
                    <FrownTwoTone rotate="180"/>
                </span>
            </template>
            <template v-else-if="column.key === 'kg2' && !isNode ">
                <span>
                    <SwapRightOutlined />
                </span>
            </template>
            <template v-else-if="column.key === 'kg1'">
                <span>
                    {{ record.kg1 }}
                </span>
            </template>
        </template>
    </a-table>
</template>

<script>
import { FrownTwoTone, SwapRightOutlined } from '@ant-design/icons-vue';
export default {
    props: {
        isNode: Boolean,
        data: null,
    },
    components: {
        FrownTwoTone,
        SwapRightOutlined,
    },
    data() {
        return {
            columns: [
                {
                    name: 'kg2',
                    dataIndex: 'kg2',
                    key: 'kg2',
                    align: 'center',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'kg1',
                    ellipsis: true,
                    align: 'center',
                },
            ]
        }
    }
}

</script>

<style scoped>
/*表格thead*/
::v-deep .ant-table-thead>tr>th {
    font-size: 12px;
    height: 5px;
    padding: 0px !important;
}

/*表格tbody*/
::v-deep .ant-table-tbody>tr>td {
    font-size: 12px;
    height: 5px;
    padding: 0px !important;
}
</style>