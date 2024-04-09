<!-- 列表显示器 -->
<template>
    <a-table v-if="getData" :columns="columns" :data-source="getData" size="small" :showHeader="false"
        :pagination="false">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'KG2' && isNode">
                <span class="circle"> </span>
            </template>
            <template v-else-if="column.key === 'KG2' && !isNode">
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
import { SwapRightOutlined } from "@ant-design/icons-vue";
import { toRaw } from "vue";

export default {
    props: {
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
                    name: "KG2",
                    dataIndex: "KG2",
                    key: "KG2",
                    align: "left",
                    width: "20%",
                },
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "KG1",
                    ellipsis: true,
                    align: "left",
                },
            ],
        };
    },

    computed: {
        getData() {
            // TODO:此处有bug，渲染顺序会影响，请在保证页面加载完毕后，修改本文件的代码以重新渲染
            // 首先尝试使用 toRaw 获取原始数据
            let rawData = toRaw(this.data);

            // 检查 rawData 是否存在并且是预期的数组结构
            if (rawData && Array.isArray(rawData[0]) && rawData[0].length > 0) {
                // 如果需要深拷贝转换为普通对象，可以使用 JSON.parse(JSON.stringify(data))
                if (this.assignId[1] == "L") {
                    return JSON.parse(JSON.stringify(rawData[this.assignId[0] - 1][0]));
                } else {
                    return JSON.parse(JSON.stringify(rawData[this.assignId[0] - 1][1]));
                }
            }
            // 返回 null 或其他适当的默认值以处理错误的数据结构
            return null;
        },
    },
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
</style>