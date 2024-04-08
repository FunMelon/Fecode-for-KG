<!-- 侧边栏表格 -->
<template>
  <a-table
    :columns="columns"
    :data-source="data"
    size="small"
    :pagination="{ pageSize: 20 }"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'KG1'"> Kg1 </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Status'">
        <span>
          <CheckCircleTwoTone
            v-if="record.Status == 'marked' || record.Status == 'unmarked'"
            two-tone-color="#52c41a"
          />
          &nbsp;
          <CloseCircleTwoTone
            v-if="record.Status == 'unmarkable' || record.Status == 'unmarked'"
            two-tone-color="#eb2f96"
          />
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
        },
      ],
    };
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
::v-deep .ant-table-tbody > tr > td {
  font-size: 12px;
  height: 40px;
  padding: 0px !important;
} 
</style>