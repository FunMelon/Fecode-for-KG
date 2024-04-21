<!-- 侧边栏表格 -->
<template>
  <a-table :columns="columns" :data-source="data" size="small" :pagination="{ pageSize: 12 }"
    :custom-row="handleCustomRow">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'KG1'"> KG1 </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Status'">
        <span>
          <!-- TODO: 重新更改图标显示逻辑 -->
          <CheckCircleTwoTone v-if="record.Status === 'marked' || record.Status === 'unmarked'"
            :two-tone-color="'#52c41a'" @click="handleIconClick(record, 'marked')" />
          &nbsp;
          <CloseCircleTwoTone v-if="record.Status === 'unmarkable' || record.Status === 'unmarked'"
            :two-tone-color="'#eb2f96'" @click="handleIconClick(record, 'unmarked')" />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script>
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons-vue";
export default {
  name: "KGTable",
  props: {
    data: Array, // 将原先的 data 属性声明修改为 tlbData
  },
  components: {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
  },
  data() {
    return {
      columns: [
        {
          title: "KG1",
          dataIndex: "KG1",
          key: "KG1",
          width: "35px",
          ellipsis: true,
        },
        {
          title: "KG2",
          dataIndex: "KG2",
          key: "KG2",
          width: "35px",
          ellipsis: true,
        },
        {
          title: "Sim",
          dataIndex: "Sim",
          key: "Sim",
          width: "28px",
          ellipsis: true,
        },
        {
          title: "Status",
          dataIndex: "Status",
          key: "Status",
          width: "30px",
          ellipsis: true,
          align: "center",
        },
      ],
      selectedRowIndex: -1 // 初始化为-1，表示没有选中的行
    };
  },
  methods: {
    handleIconClick(record, clickedStatus) {  // 点击删除图标
      // console.log(record.Status);
      // console.log(clickedStatus);
      // if (record.Status === clickedStatus) {
      //   return;
      // }

      // 如果点击了marked图标，则删除unmarked图标，反之亦然
      if (clickedStatus === 'marked') {
        record.Status = 'marked';
      } else {
        record.Status = 'unmarkable';
      }
    },
    handleCustomRow(record, index) {
      return {
        onClick: () => {
          // console.log(record); // 打印行数据到控制台
          this.$emit('row-click', record);
          this.selectedRowIndex = index; // 更新选中的行索引
          console.log(index);
        },
        style: {
          color: index === this.selectedRowIndex ? 'red' : '' // 如果当前行的索引等于选中的行索引，则设置字体颜色为红色
        }
      };
    }
  },
};
</script>

<style scoped>
.block {
  width: 100%;
  max-height: 100px;
  max-width: 250px;
  border-bottom: 1px solid gray;
}

/*表格thead*/
/* ::v-deep .ant-table-thead > tr > th {
  font-size: 10px;
  height: 5px;
  padding: 0px !important;
} */

/*表格tbody*/
::v-deep .ant-table-tbody>tr>td {
  font-size: 12px;
  height: 40px;
  padding: 0px !important;
}
</style>