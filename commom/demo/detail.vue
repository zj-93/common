<template>
  <div class="demo">
    <BKForm ref="form" v-model="ruleForm" :data-j="dataJ" :isAdd="detail"/>
  </div>
</template>

<script>
import BKForm from "@/commom/bkForm/editOrDetail";
import { dataJson } from "./functions/data";
import { tableJson } from "./functions/table";
import { getOrderList } from "@/views/order/api.js";

export default {
  components: {
    BKForm,
  },
  data() {
    return {
      dataJ: [],
      ruleForm: {
        purchaseOrderCode: "ZSFWV456",
        warehouseName: "精神病科",
        orderDateStart: "2021-07-09",
        orderDateEnd: "2021-07-09",
        orderType: 1,
        orderStatus: 1,
        minval: 21,
        maxval: 123
      },
    };
  },
  create: {},
  mounted() {
    this.dataJ = dataJson(this);
    this.tableJ = tableJson(this);
    // this.getList();
  },
  methods: {
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