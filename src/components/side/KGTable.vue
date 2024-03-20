<template>
    <a-table :columns="columns" :data-source="data" size="small" :pagination="{ pageSize: 20 }">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'kg1'">
                Kg1
            </template>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
                <span>
                    <CheckCircleTwoTone v-if="record.status == 'marked' || record.status == 'unmarked'" two-tone-color="#52c41a"/>
                    &nbsp;
                    <CloseCircleTwoTone v-if="record.status == 'unmarkable' || record.status == 'unmarked'" two-tone-color="#eb2f96" />
                </span>
            </template>
        </template>
    </a-table>
</template>

<script>
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons-vue';
export default {
    name: "KGTable",
    props: {
        data: null
    },
    components: {
        CheckCircleTwoTone,
        CloseCircleTwoTone,
    },
    data() {
        return {
            columns: [
                {
                    name: 'Kg1',
                    dataIndex: 'kg1',
                    key: 'kg1',
                    width: "50px",
                    ellipsis: true,
                },
                {
                    title: 'Kg2',
                    dataIndex: 'kg2',
                    key: 'kg2',
                    width: "50px",
                    ellipsis: true,
                },
                {
                    title: 'Sim',
                    dataIndex: 'similarity',
                    key: 'similarity',
                    width: "30px",
                    ellipsis: true,
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: "30px",
                    ellipsis: true,
                    align: 'center'
                }
            ]
        }
    }
}

</script>

<style scoped>
.block {
    width: 100%;
    max-height: 100px;
    max-width: 250px;
    border-bottom: 1px solid gray;
}

/*表格thead*/
::v-deep .ant-table-thead>tr>th {
    font-size: 10px;
    height: 5px;
    padding: 0px !important;
}

/*表格tbody*/
::v-deep .ant-table-tbody>tr>td {
    font-size: 12px;
    height: 30px;
    padding: 0px !important;
}

</style>