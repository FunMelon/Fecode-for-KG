<!-- 侧边栏表格 -->
<template>
  <a-table :columns="columns" :data-source="data" size="small" :pagination="{ pageSize: 12 }">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'KG1'"> KG1 </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Status'">
        <span>
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
    data: null,
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
          // customCell: () => ({
          //   // 设置单元格的onClick事件
          //   onClick: (event) => {
          //     // 在这里可以添加特定元素的事件处理逻辑
          //     const targetElement = event.target;
          //     const fill = targetElement.getAttribute('fill');

          //     console.log(targetElement);
          //     console.log(fill);
          //     if (fill === '#52c41a' || fill === "#f6ffed") {
          //       // 点击的是填充颜色为 rgb(246, 255, 237) 的元素
          //       console.log('Yes');
          //     } else {
          //       // 其他情况
          //       console.log('No');
          //     }
          //   },
          // }),
        },
      ],
    };
  },
  methods: {
    handleIconClick(record, clickedStatus) {
      console.log(record.Status);
      console.log(clickedStatus);
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