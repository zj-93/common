<template>
  <div ref="settlePrintNew" v-show="false">
    <div>
      <div v-for="(item,index) in QRCodeList.data" :key="index" style="height:29.9mm;">
        <div style="width:50mm;display:flex;justify-content: space-between;border: 0px solid #ccc; overflow:hidden;">
            <img style="width: 80px;height: 80px;display:flex;margin-top: 5%" :src="item.url || ''" />
            <div style="width:142px;margin-top: 9%">
              <div v-for="(ele,index) in QRCodeList.textHead" :key="index" 
                  style="overflow: hidden;white-space: nowrap;font-size: 12px;display:flex;">
              {{ele.label}}:{{item[ele.prop]}}
              </div>
            </div>
        </div>
        <div style="width:50mm;border: 0px solid #ccc; overflow:hidden;display:flex;justify-content: space-between;">
          <div v-for="(ele,index) in QRCodeList.textFooter" :key="index" 
              style="overflow: hidden;white-space: nowrap;font-size: 12px;display:flex;padding-right:23px">
            {{item[ele.prop]}}
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
import moment from "moment";
import lodop from "./common/third/lodop/LodopFuncs";
export default {
  data() {
    return {
      QRCodeList: []
    };
  },
  computed: {
    // newTbody() {
    //   this.printData.table.thead.forEach((el, i) => {
    //     el.arr = [];
    //     this.printData.table.tbody.forEach((item, k) => {
    //       if (item[el.prop]) el.arr.push(item[el.prop]);
    //     });
    //   });
    //   return this.printData.table.thead;
    // },
  },
  methods: {
    // 打印方法
    print(opts) {
      this.QRCodeList = opts
      this.dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.$nextTick(() => {
        this.callLodop();
      });
    },
    // 打印预览
    callLodop() {
      // 条形码打印
      // JsBarcode(this.$refs.qr, "1234567890", {
      //   text: "",
      //   format: "CODE39",
      //   displayValue: true,
      //   width: 2.0,
      //   height: 100,
      //   margin: 0,
      // });
      // JsBarcode("#qr", 123, { height: 50, displayValue: false });
      // 表格内部二维码打印
      // this.checkBill.lstSub.forEach(item=>{
      //     if(item.qty>0){
      //         JsBarcode("#code_sub_"+item.cheakRowCode, item.cheakRowCode, { height: 20, displayValue: false });
      //     }
      // });
      var LODOP = lodop.getLodop();
      var dom = this.$refs.settlePrintNew.innerHTML;
      // LODOP.SET_PRINT_PAGESIZE(1,'60mm', '40mm', "A4"); /*1:纵向打印，2:横向打印*/
      // LODOP.SET_PRINT_PAGESIZE(0,1000,2000,"打印");

      LODOP.PRINT_INIT("barcodePrint");
      LODOP.SET_PRINT_PAGESIZE(1,"50mm","30mm","barcodePage");
      LODOP.SET_PRINT_MODE("RESELECT_PRINTER", true); //允许重选打印机
      LODOP.ADD_PRINT_HTM(
        "0mm",
        "0mm",
        "100%",
        "100%",
        this.$refs.settlePrintNew.innerHTML
      );
      LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", true);
      LODOP.PREVIEW();
    },
    handleError(err, loading) {
      return new Promise((resolve, reject) => {
        this.$msgbox({ title: "错误", type: "error", message: err })
          .then((action) => {
            if (loading !== null && loading !== undefined) {
              loading = false;
            }
            resolve(action);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.s {
  justify-content: space-between;
}
</style>
