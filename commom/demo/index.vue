<template>
  <div class="demo">
    <BKForm ref="form" v-model="ruleForm" :data-j="dataJ" @search-form="searchForm" />
    <BKTable :tableHead="tableJ" :tableData="tableData" :total="total" :isAdd="false" />
  </div>
</template>

<script>
import BKForm from "@/commom/bkForm/searchForm";
import BKTable from "@/commom/tableForm/bkTable";
import { dataJson } from "./functions/data";
import { tableJson } from "./functions/table";
import { getOrderList } from "@/views/order/api.js";

export default {
  components: {
    BKTable,
    BKForm,
  },
  data() {
    return {
      dataJ: [],
      ruleForm: {
        purchaseOrderCode: "",
        warehouseName: "",
        orderDateStart: "",
        orderDateEnd: "",
        orderType: ["1", "2"],
        orderStatus: ["1", "2", "3", "4", "5"],
        minval: '',
        maxval: ''
      },
      tableJ: [],
      tableData: [{}],
      total: 0,
    };
  },
  create: {},
  mounted() {
    this.dataJ = dataJson(this);
    this.tableJ = tableJson(this);
    this.getList();
  },
  methods: {
    searchForm(){
      this.getList()
    },
    getList(page) {
      let params = {
        ...this.ruleForm,
        ...page
      };
      getOrderList(params).then((res) => {
        if (res.status) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  height: 100%;
}
</style>