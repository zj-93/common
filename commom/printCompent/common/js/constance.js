
export const fileServer = {
  upload: '/platformService/sys/upload/file/',
  download: '/upload/',
  imgBasePath: '/upload/',
  download2:'/platformService/sys/upload/downFile'
}

// 出库单状态
export const OUTSTOCK_STATUS = {
  '90': { text: '保存' },
  '10': { text: '提交' },
  '20': { text: '审核' },
  '30': { text: '记帐' },
  '40': { text: '作废' },
  '50': { text: '驳回' },
  '60': { text: '入库' },
  '70': { text: '结算' },
  '69': { text: '部分入库'},
  '61': { text: '部分消耗'},
  '62': { text: '全部消耗'}
}

export const OUTSTOCK_BILL_STATUS = {
  'SAVE': { text: '保存', value: '90' },
  'SUBMIT': { text: '提交', value: '10' },
  'CHECKED': { text: '审核', value: '20' },
  'ACCOUNT': { text: '记帐', value: '30' },
  'ABOLISH': { text: '作废', value: '40' },
  'REJECT': { text: '驳回', value: '50' },
  'INSTOCK': { text: '入库', value: '60' },
  'SETTLEMENT': { text: '入库', value: '80' }
}

// 出库类型
export const OUTSTOCK_KIND = {
  '40': { text: '请购出库' },
  '10': { text: '调拨出库' },
  '20': { text: '手工出库' },
  '30': { text: '科室出库' },
  '50': { text: '科室退货出库' },
  '51': { text: '中心库退货出库' },
  '60': { text:  '定数包消耗出库'},
  '65': { text:  '高值消耗出库'},
  '70':{ text:  '手术包领用出库'}
  //'52': { text:  '高值科室退货出库'}
}
//退货单类型
export const RETURN_PROV_KIND = {
  '10': { text: '验收退货' },
  '20': { text: '库房退货' },
  '21': { text: '中心库退货' },
  '30': { text: '高值科室退货' }
}
export const OUTSTOCK_BILL_KIND = {
  'REQUEST': { text: '请购出库', value: '40' },
  'TRANSFER': { text: '调拨出库', value: '10' },
  'MANUAL': { text: '手工出库', value: '20' },
  'CONSUME': { text: '科室出库', value: '30' },
  'RETURN': { text: '退货出库', value: '50' },
  'PACKAGE':{text:'消耗出库',value: '60'},
  'SURGERY':{text:'手术包领用出库出库',value: '70'}
}

// 出库方式
export const OUTSTOCK_TYPE = {
  'PURCHASE': { text: '实购', value: 10 },
  'PREORDER': { text: '预购', value: 20 }
}
//手术包主表状态
export const SURGERY_MAIN_STATUS ={
  '0':{text:'已打包',index: 1 },
  '10':{text:'请购出库',index: 2 },
  '20':{text:'请购入库',index: 3 },
  '30':{text:'部分消毒',index: 4 },
  '31':{text:'无需消毒',index: 5 },
  '32':{text:'全部消毒',index: 6 },
  '40':{text:'领用登记',index: 7 },
  '41':{text:'手术包消耗',index: 8 },
}
// 请购单主表状态
export const DEPTBUY_MAIN_STATUS = {
  '0': { text: '已作废', index: 1 },
  '10': { text: '已保存(护士)', index: 2 },
  '11': { text: '已审核(内部)', index: 3 },
  '20': { text: '已审核(请购)', index: 4 },
  '25': { text: '手术包已部分拣货', index: 5 },
  '26': { text: '手术包已全部拣货', index: 6 },
  '30': { text: '处理中', index: 7 },
  '40': { text: '已处理', index: 8 }

}
// 请购单子表状态
export const DEPTBUY_SUB_STATUS = {
  '10': { text: '待处理', index: 1 },
  '20': { text: '已驳回', index: 2 },
  '30': { text: '不采购', index: 3 },
  '40': { text: '部分配送', index: 4 },
  '50': { text: '全部配送', index: 5 },
  '60': { text: '已采购', index: 6 }
}
//出库单状态
export const DISTRBILL_STATUS = {
  "10": { text: '待提交', index: 1 },
  "20": { text: '已配送', index: 2 },
  "30": { text: '部分收货', index: 3 },
  "40": { text: '全部收货', index: 4 },
  "26": { text: '验收入库', index: 5 },
};
//结算单状态
export const SETTLE_STATUS = {
  "10": { text: '已保存', index: 1 },
  "12": { text: '待审核', index: 2 },
  "14": { text: '已驳回', index: 3 },
  "20": { text: '已审核', index: 4 },
  "30": { text: '已上传', index: 5 },
  "40": { text: '已确认', index: 6 },
  "21": { text: '已接收', index: 7 },
  "22": { text: '已汇款', index: 8 }
};

export const SETTLE_TYPE = {
  "10": { text: '一级库出库结算', index: 1 },
  "20": { text: '科室库入库结算', index: 2 },
  "30": { text: '消耗结算', index: 3 },
  "40": { text: '办公用品结算', index: 4 },
  "50": { text: '冲账结算', index: 5 },
  "60": { text: '试剂验收入库结算', index: 6 },
};

// 报告来源
export const REPORT_SOURCE1 = {
  "1": { text: '使用单位', index: 1 },
  "2": { text: '经营企业', index: 2 },
  "3": { text: '生产企业', index: 3 },
  "4": { text: '个人', index: 4 }
};
// 报告来源
export const REPORT_SOURCE = [
  { text: '使用单位', value: '1' },
  { text: '经营企业', value: '2' },
  { text: '生产企业', value: '3' },
  { text: '个人', value: '4' }
];
// 报告人类别
export const REPORTER_TYPE = {
  "1": { text: '医师', index: 1 },
  "2": { text: '技师', index: 2 },
  "3": { text: '护士', index: 3 },
  "4": { text: '工程师', index: 4 },
  "5": { text: '其它', index: 5 }
};
// 报告人类别
export const EVENT_RESULT = {
  "1": { text: '死亡', index: 1 },
  "2": { text: '危及生命', index: 2 },
  "3": { text: '机体功能结构永久性损伤', index: 3 },
  "4": { text: '可能导致机体功能结构永久性损伤', index: 4 },
  "5": { text: '需要内、外科治疗避免上述永久损伤', index: 5 },
  "6": { text: '其它', index: 6 }
};
// 医疗器械使用场所
export const APPARATUS_WHEREUSED = {
  "1": { text: '医疗机构', index: 1 },
  "2": { text: '家庭', index: 2 },
  "3": { text: '其它', index: 3 }
};
// 事件报告状态
export const EVENTREPORT_STATUS = {
  "1": { text: '已通知使用单位', index: 1 },
  "2": { text: '已通知生产企业', index: 2 },
  "3": { text: '已通知经营企业', index: 3 },
  "4": { text: '已通知药监部门', index: 4 }
};
// 调价状态
export const ADJUST_STATUS = {
  "10": { text: '保存',value:"10", index: 1 },
  "20": { text: '提交',value:"20", index: 2 },
  "30": { text: '等待生效',value:"30", index: 3 },
  "40": { text: '驳回',value:"40", index: 4 },
  "50": { text: '生效中',value:"50", index: 5 },
  "60": { text: '生效失败',value:"60", index: 6 },
  "70": { text: '已失效',value:"70", index: 7 },
  "80": { text: '失效失败',value:"80", index: 8 },
};
  // K科室商品申请审核状态
export const APPLY_STATUS = {
  '0': { text: '初始' },
  '10': { text: '已提交' },
  '20': { text: '已批准' },
  '30': { text: '已驳回' },
  '40': { text: '已阅' }
};

export const INVENTORY_STATUS = {
  '10': { text: '已提交' },
  '20': { text: '已盘点' },
};

export const BARCODE_PARSE = {
  PACKAGE: {
    PREFIX: 'b',
    LENGTH: 11,
  },
  UNIQUE: {
    PREFIX: 'e',
    LENGTH: 20,
  }
};
// 是否启用二级供应商模式
export const IS_USE_SUBPROV = {
  '0': { text: '否' },
  '1': { text: '是' }
};

// 采购模式
export const PUR_MODE_DICT = {
  '10': { text: '低值' },
  '20': { text: '高值' },
  '30': { text: '办公' }

};
// 手术推送单主表状态
export const SUR_PUSH_MAIN_BILL = {
  '0': { text: '初始' },
  '10': { text: '在途' },
  '20': { text: '已入库' },
  '-1': { text: '已作废' }
};


export const PUR_MODE_LST=[
        {key:1000,val:"全部"},
        {key:10,val:"低值"},
        {key:20,val:"高值"},
        {key:30,val:"办公"},
        {key:60,val:"试剂"}

];
export const CONSUME_TYPES = [
  { key:0,value:"", text: "全部"},
  { key:1,value:"科室消耗", text: "科室消耗"},
  { key:2,value:"过期消耗", text: "过期消耗"},
  { key:3,value:"请购消耗", text: "请购消耗"}
];
export const companyKind = {
  HOS: "1",
  PROV: "2",
  MFRS: "3",
  MFRS_PROV: "4"
};
