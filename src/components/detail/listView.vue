<!-- 列表显示器 -->
<template>
    <a-table v-if="getData" :columns="columns" :data-source="getData" size="small" :showHeader="this.isModal"
        :pagination="paginationConfig" :custom-row="handleCustomRow">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'Icon1' && isNode">
                <span class="circle" :style="{ background: record.left.KG1 === selectedRow ? 'red' : '' }"> </span>
            </template>
            <template v-else-if="column.key === 'Icon1' && !isNode">
                <span>
                    <SwapRightOutlined/>
                </span>
            </template>
            <template v-if="column.key === 'KG1'">
                {{ record.left.KG1 }}
            </template>
            <template v-if="column.key === 'Icon2' && isNode">
                <span class="circle" :style="{ background: record.left.KG1 === selectedRow ? 'red' : '' }"> </span>
            </template>
            <template v-else-if="column.key === 'Icon2' && !isNode">
                <span>
                    <SwapRightOutlined />
                </span>
            </template>
            <template v-if="column.key === 'KG2'">
                {{ record.right.KG2 }}
            </template>
            <template v-if="this.isModal && column.key === 'Sim'">
                {{ record.right.Sim }}
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
        isModal: Boolean,
    },
    components: {
        SwapRightOutlined,
    },
    setup() { },
    data() {
        return {
            columns: [
                {
                    name: "Icon1",
                    dataIndex: "icon1",
                    key: "Icon1",
                    align: "right",
                    width: this.isModal ? "5%" : "10%"
                },
                {
                    title: "KG1",
                    dataIndex: "kg1",
                    key: "KG1",
                    ellipsis: true,
                    align: "left",
                    width: this.isModal ? "30%" : "40%"
                },
                {
                    name: "Icon2",
                    dataIndex: "icon2",
                    key: "Icon2",
                    align: "left",
                    width: this.isModal ? "5%" : "10%"
                },
                {
                    title: "KG2",
                    dataIndex: "kg2",
                    key: "KG2",
                    ellipsis: true,
                    align: "left",
                    width: this.isModal ? "30%" : "40%"
                },
                {
                    title: "Sim",
                    dataIndex: "sim",
                    key: "Sim",
                    ellipsis: true,
                }
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
            for (var i = 0; i < res[0].length; ++i) {
                if (!this.isModal && i == 5) {
                    break;
                }
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
        paginationConfig() {
            if (this.isModal) {
                return { pageSize: 5 }; // 如果 isModal 为 true，则每页显示 5 个条目
            } else {
                return false; // 如果 isModal 为 false，则不显示分页器
            }
        }
    },

    methods: {
        handleCustomRow(record) {
            return {
                onClick: () => {
                    if (!this.isNode) {
                        return
                    }
                    // console.log(record); // 打印行数据到控制台
                    this.$emit('listClick', {
                        selectList: this.assignId,
                        record: record,
                        selectedRow: record.left.KG1
                    });

                    this.selectedRow = record.left.KG1 // 更新选中的行索引
                },
                style: {
                    color: record.left.KG1 === this.selectedRow ? 'red' : '',
                }
            };
        },
        clearSelectedRow() {
            // console.log("清空选择")
            this.selectedRow = -1;
        },
        setSelected(newData) {
            if (this.selectedRow != newData) {
                this.selectedRow = newData; 
            }
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
    background: #52C41A;
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