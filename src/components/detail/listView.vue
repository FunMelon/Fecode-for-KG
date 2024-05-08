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
            <template v-else-if="column.key === 'KG'">
                <span v-if="this.assignId[1] == 'L'">
                    {{ record.KG1 }}
                </span>
                <span v-else>
                    {{ record.KG2 }}
                </span>
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
                    width: "20%",
                },
                {
                    title: "KG",
                    dataIndex: "kg",
                    key: "KG",
                    ellipsis: true,
                    align: "left",
                },
            ],
            selectedRow: -1,
        };
    },

    computed: {
        getData() {
            // 首先尝试使用 toRaw 获取原始数据
            // let rawData = toRaw(this.data);

            // // console.log(JSON.parse(JSON.stringify(rawData[this.assignId[0] - 1][0])));
            // // 检查 rawData 是否存在并且是预期的数组结构
            // var jsonData = null;
            // if (rawData && Array.isArray(rawData[0]) && rawData[0].length > 0) {
            //     // 如果需要深拷贝转换为普通对象，可以使用 JSON.parse(JSON.stringify(data))
            //     if (this.assignId[1] == "L") {
            //         jsonData = JSON.parse(JSON.stringify(rawData[this.assignId[0] - 1][0]));
            //     } else {
            //         jsonData = JSON.parse(JSON.stringify(rawData[this.assignId[0] - 1][1]));
            //     }

            //     jsonData.sort((a, b) => {
            //         if (this.isAscend) {
            //             return a.KG1.localeCompare(b.KG1);
            //         } else {
            //             return b.KG1.localeCompare(a.KG1);
            //         }
            //     });
            // }
            // // 返回 null 或其他适当的默认值以处理错误的数据结构
            // return jsonData;
            var data = null;
            if (this.data) {
                if (this.assignId[1] == "L") {
                    data = this.data.Res[0];
                } else {
                    data = this.data.Res[1];
                }
            }
            // console.log(data);
            data = data.slice(0, 5)
            return data;
        },
    },

    methods: {
        handleCustomRow(record) {
            return {
                onMouseenter: () => {
                    // console.log(record); // 打印行数据到控制台
                    this.$emit('hover', record);
                    this.selectedRow = record.KG1; // 更新选中的行索引
                    // console.log(this.selectedRow);
                    // console.log(index);
                },
                style: {
                    color: record.KG1 === this.selectedRow ? 'red' : '', // 如果当前行的索引等于选中的行索引，则设置字体颜色为红色
                }
            };
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
    font-size: 12px; /* 按钮字体大小 */
    padding: 5px 8px; /* 按钮内边距 */
    margin: 0 2px; /* 按钮外边距 */
}

/* 自定义分页器当前页按钮样式 */
.ant-pagination-item.ant-pagination-item-active .ant-pagination-item-link {
    font-size: 12px; /* 当前页按钮字体大小 */
    padding: 5px 8px; /* 当前页按钮内边距 */
    margin: 0 2px; /* 当前页按钮外边距 */
}
</style>