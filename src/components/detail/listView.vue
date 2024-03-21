<!-- 列表显示器 -->
<template>
    <a-table :columns="columns" :data-source="data" size="small" :showHeader=false :pagination=false>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'KG2' && isNode ">
                <span>
                    <FrownTwoTone />
                </span>
            </template>
            <template v-else-if="column.key === 'KG2' && !isNode ">
                <span>
                    <SwapRightOutlined />
                </span>
            </template>
            <template v-else-if="column.key === 'KG1'">
                <span>
                    {{ record.KG1 }}
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
                    name: 'KG2',
                    dataIndex: 'KG2',
                    key: 'KG2',
                    align: 'center',
                    width: "20%",
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'KG1',
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