<!-- 侧边栏表格 -->
<template>
  <a-table :columns="columns" :data-source="data" size="small" :pagination="{ pageSize: 20 }" class="custom-table"
    :custom-row="handleCustomRow">
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
            :two-tone-color="'#eb2f96'" @click="handleIconClick(record, 'unmarkable')" />
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
    newRow: null
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
      selectedRow: -1 // 初始化为-1，表示没有选中的行
    };
  },
  watch: {
    newRow(newData) {
      if (newData != null && this.data != null && this.selectedRow != -1) {
        //TODO: 创建一个data的副本，在其中找到selectedRow对应的行，将改行替换为newData的数据，传递给父组件信息让其修改data
        const index = this.data.findIndex(item => item === this.selectedRow);
        newData.Status = this.data[index].Status
        const updatedData = [...this.data]; // 创建数据的副本
        updatedData[index] = newData; // 更新对应行的数据，保持 Status 不变
        this.selectedRow = newData
        this.$emit('updateData', updatedData); // 向父组件发送更新后的数据
      }
    }
  },
  methods: {
    handleIconClick(record, clickedStatus) {  // 点击删除图标
      // console.log(record.Status);
      // console.log(clickedStatus);

      record.Status = clickedStatus;
    },

    handleCustomRow(record) {
      return {
        onClick: () => {
          // console.log(record); // 打印行数据到控制台
          this.$emit('row-click', record);
          this.selectedRow = record; // 更新选中的行索引
          // console.log(index);
        },
        style: {
          background: record === this.selectedRow ? 'red' : '', // 如果当前行的索引等于选中的行索引，则设置字体颜色为红色
        }
      };
    }
  },
};
</script>