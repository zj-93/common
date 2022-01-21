<template>
  <div ref="settlePrintNew" v-show="false">
    <div v-if="printData.title || printData.qrCode" class="qr-box" style="text-align: center;font-size: 18px;height: 80px;line-height: 50px;">
      <span v-if="printData.title">{{printData.title}}</span>
      <img v-if="printData.qrCode" style=" width: 50px;height: 50px;float: right;" ref="qr" :src="printData.qrCode" />
    </div>
    <!-- 表单 -->
    <div>
      <table
        border="0"
        cellspacing="0"
        cellpadding="1"
        width="100%"
        style="border-collapse:collapse;font-size: 13px;"
        bordercolor="#333333"
      >
        <tr v-for="(el,k) in formData1" :key="k">
          <td
            style="text-align: left;font-size: 14px;height: 30px"
            v-for="(item,index) in el"
            :key="index"
          >
            {{item.label}}: {{item.value}}
          </td>
        </tr>
      </table>
      <table
        border="0"
        cellspacing="0"
        cellpadding="1"
        width="100%"
        style="border-collapse:collapse;font-size: 13px;"
        bordercolor="#333333"
      >
        <tr v-for="(el,k) in formData2" :key="k">
          <td
            style="text-align: left;font-size: 14px;height: 30px"
            v-for="(item,index) in el"
            :key="index"
          >{{item.label}}: {{item.value}}</td>
        </tr>
      </table>
      <div
      style="margin-top:50px"
        v-show="printData.table.thead.length"
        v-for="(ele,ind) in printData.table.thead"
        :key="ind"
      >
        <div v-if="printData.tableTitleList">
          <div v-for="(elm,index) in printData.tableTitleList" :key="index" style="display: inline-block;font-size: 20px;color: red;margin-bottom: 10px;" :style="{width: elm.width}">
            {{elm.label}}: {{elm.value}}
          </div>
        </div>
        <table
          border="1"
          cellspacing="0"
          cellpadding="1"
          width="100%"
          style="border-collapse:collapse;font-size: 13px;"
          bordercolor="#333333"
        >
          <tr colspan="13" style="text-align: center;font-size: 18px;">
            <td style="text-align: center;font-size: 14px;height: 30px">序号</td>
            <td
              v-for="(item, index) in ele"
              :key="index"
              style="text-align:center;font-size: 14px;height: 30px"
            >{{item.label}}</td>
          </tr>

          <tr
            v-for="(dom,index) in printData.table.tbody[ind]"
            :key="index"
            style="text-align: center;font-size: 18px;"
          >
            <td>{{index + 1}}</td>
            <td
              v-for="(item, inx) in ele"
              :key="inx"
              style="text-align: center;font-size: 14px;height: 30px"
            >
              <div v-if="item.type && item.type == 'qr'">
                <img style="max-width:200px" :src="dom[item.prop]" alt="">
              </div>
              <div style="word-break: break-all;" v-else>
                  {{ dom[item.prop]}}
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="autograph-box" style="display:flex;width: 100%;margin-top: 30px">
        <slot>
          <span style="width:50%; flex: 1" class="autograph-item">验收人:</span>
          <span style="width:50%; flex: 1" class="autograph-item">审核人:</span>
        </slot>
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
      printData: {
        title: "验收单",
        searchOpts: [],
        table: {
          thead: [],
          tbody: [],
        },
      },
      
        formData1: [],
        formData2: []
    };
  },
  computed: {
    // searchOptsRes() {
    //   let len = this.printData.searchOpts.length;
    //   let n = 4; //假设每行显示4个
    //   let lineNum = len % 4 === 0 ? len / 4 : Math.floor(len / 4 + 1);
    //   let res = [];
    //   for (let i = 0; i < lineNum; i++) {
    //     let temp = this.printData.searchOpts.slice(i * n, i * n + n);
    //     res.push(JSON.parse(JSON.stringify(temp)));
    //   }
    //   return res;
    // },
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
      this.printData = opts;
      // let len = opts.searchOpts.length;
      // let n = 4; //假设每行显示4个
      // let lineNum = len % 4 === 0 ? len / 4 : Math.floor(len / 4 + 1);
      // let res = [];
      // for (let i = 0; i < lineNum; i++) {
      //   let temp = this.printData.searchOpts.slice(i * n, i * n + n);
      //   res.push(JSON.parse(JSON.stringify(temp)));
      // }
      this.formData1 = []
      this.formData2 = []
      let temp = []
      let temp1 = []
      opts.searchOpts.forEach(el => {
        if(el.colNum){
          temp1.push(el)
        } else {
          temp.push(el)
        }
      })
      const n = 4
      let l = temp.length
      let lNum = l % 4 === 0 ? l / 4 : Math.floor(l / 4 + 1);
      
      for(let i=0;i<lNum; i++){
        this.formData1.push(temp.slice(i * n, i * n + n))
      }
      const m = 2
      let k = temp1.length
      let kNum = k % 2 === 0 ? k / 2 : Math.floor(k / 2 + 1);
      for(let j=0;j<kNum; j++){
        this.formData2.push(temp1.slice(j * m,j * m + m))
      }
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
      // var dom = this.$refs.settlePrintNew.innerHTML;
      // LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); /*1:纵向打印，2:横向打印*/
      LODOP.SET_PRINT_MODE("RESELECT_PRINTER", true); //允许重选打印机
      LODOP.ADD_PRINT_HTM(
        "2mm",
        "3.25mm",
        "93%",
        "225mm",
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
</style>
