/**
 *
 * @param {zhoujun} v
 * @returns
 * -------表单--------
 *  isAdd 详情或新增
 *  config 配置项
 *        type: add || detail
 *        autoWith: 表单，单个宽度，支持百分比或px
 *  -------公共字段-----
 *  *prop 编辑字段
 *  *label 字段展示名
 *  labelWidth 字段展示名宽度，默认100px
 *  *type 表单插件类别
 *   disabled 是否禁用
 *   detailProp 详情展示字段
 *      当编辑字段与详情展示字段一样时，detailProp可以不写
 *   placeholder 提示语，默认值为 请输入或请选择 + label
 *   props:
 *          select插件修改展示字段与名字 默认label,value
 *          cascader插件配置详情见element-ui
 *  *options: 下拉数据源
 *   class: 额外样式
 *   clearable 组件清除，默认可清除，如不需要，置为true
 *  
 *      
 * ------组件类型相关方法--------
 *   input: blur：聚焦
 *          fouce：失焦
 *          input：输入改变时
 *   select: change：数据改变的方法
 *           remote： 是否远程搜索
 *           remoteMethod： 远程方法
 *           详情见element-ui
 * 
 *   formatter：方法 支持自定义详情展示数据
 *  *onsuccess：图片上传成功回调
 *        event： 当前元素
 *        data：后台返回数据
 *  *removeImg：图片移除回调
 *   
 */

export const dataJson = function(v) {
    return [{
            label: "订单编号",
            prop: "purchaseOrderCode",
            type: "input",
            placeholder: "请输入订单编号",
            isScan: true
        },
        {
            label: "订单编号",
            prop: "purchaseOrderCode",
            type: "input",
            placeholder: "请输入订单编号"
        },
        {
            label: "订单编号",
            prop: "purchaseOrderCode",
            type: "input",
            placeholder: "请输入订单编号"
        },
        {
            label: "订单编号",
            prop: "purchaseOrderCode",
            type: "input",
            placeholder: "请输入订单编号"
        },
        {
            label: "订单编号",
            prop: "purchaseOrderCode",
            type: "input",
            placeholder: "请输入订单编号"
        },
        {
            label: "订单日期",
            prop: "date",
            type: "daterange",
            placeholder: "请选择订单日期"
        },
        {
            label: "仓库",
            prop: "warehouseName",
            type: "input",
            placeholder: "请输入仓库"
        },
        {
            label: "订单类型",
            prop: "orderType",
            type: "select",
            options: [],
            placeholder: "请选择订单类型"
        },
        {
            label: "数字",
            prop: "num",
            type: "inputNumber",
            options: [],
            input: () => {
                v.$limitInt(v.ruleForm, 'num')
            }
        },
        {
            label: "计数范围",
            minprop: 'minval',
            maxprop: 'maxval',
            type: "numrange",
        },
        {
            label: "订单状态",
            prop: "orderStatus",
            type: "select",
            options: [],
            placeholder: "请选择订单状态"
        }
    ]
}