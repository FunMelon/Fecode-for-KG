<!-- 列表显示器 -->
<template>
    <a-table v-if="getData" :columns="columns" :data-source="getData" size="small" :showHeader="false"
        :pagination="false" :custom-row="handleCustomRow">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'Sim' && isNode">
                <span class="circle"> </span>
            </template>
            <template v-else-if="column.key === 'Sim' && !isNode">
                <span>
                    <SwapRightOutlined />
                </span>
            </template>
            <template v-if="column.key === 'KG1'">
                {{ record.left.KG1 }}
            </template>
            <template v-if="column.key === 'KG2'">
                {{ record.right.KG2 }}
            </template>
        </template>
    </a-table>
</template>

<script>
import { SwapRightOutlined } from "@ant-design/icons-vue";
// import { toRaw } from "vue";

export default {
    props: {
        isAscend: Boolean,  // 排序类型
        isNode: Boolean,
        data: null,
        assignId: String,
        chosenId: String,
    },
    components: {
        SwapRightOutlined,
    },
    setup() { },
    data() {
        return {
            columns: [
                {
                    name: "Sim",
                    dataIndex: "Sim",
                    key: "Sim",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "KG1",
                    dataIndex: "kg1",
                    key: "KG1",
                    ellipsis: true,
                    align: "left",
                    width: "40%"
                },
                {
                    title: "KG2",
                    dataIndex: "kg2",
                    key: "KG2",
                    ellipsis: true,
                    align: "left",
                },
            ],
            selectedRow: -1,
        };
    },

    computed: {
        getData() {
            var data = []
            var res = this.data.Res
            if (this.isAscend) {
                // 升序排序
                res[0].sort((a, b) => a.Sim - b.Sim);
                res[1].sort((a, b) => a.Sim - b.Sim);
            } else {
                // 降序排序
                res[0].sort((a, b) => b.Sim - a.Sim);
                res[1].sort((a, b) => b.Sim - a.Sim);
            }
            for (var i = 0; i < 5 && i < res[0].length; ++i) {
                data.push({
                    IDPair: {
                        ID1: this.data.ID1,
                        ID2: this.data.ID2,
                    },
                    left: res[0][i],
                    right: res[1][i]
                })
            }

            if (this.chosenId !== this.assignId) {
                this.clearSelectedRow(); // 清空选中的行索引
            }
            // console.log (data)
            return data;
        },
    },

    methods: {
        handleCustomRow(record) {
            return {
                onClick: () => {
                    // console.log(record); // 打印行数据到控制台
                    this.$emit('click', {
                        selectList: this.assignId,
                        record: record
                    });

                    this.selectedRow = record.left.KG1 // 更新选中的行索引
                },
                style: {
                    color: record.left.KG1 === this.selectedRow ? 'red' : '', // 如果当前行的索引等于选中的行索引，则设置字体颜色为红色
                }
            };
        },
        clearSelectedRow() {
            this.selectedRow = -1;
        }
    }
};
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

.circle {
    display: block;
    background: #52c41a;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 4px;
}

/* 自定义分页器按钮样式 */
.ant-pagination-item-link:not(.ant-pagination-item-active) {
    font-size: 12px;
    /* 按钮字体大小 */
    padding: 5px 8px;
    /* 按钮内边距 */
    margin: 0 2px;
    /* 按钮外边距 */
}

/* 自定义分页器当前页按钮样式 */
.ant-pagination-item.ant-pagination-item-active .ant-pagination-item-link {
    font-size: 12px;
    /* 当前页按钮字体大小 */
    padding: 5px 8px;
    /* 当前页按钮内边距 */
    margin: 0 2px;
    /* 当前页按钮外边距 */
}
</style>