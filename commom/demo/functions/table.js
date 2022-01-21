/**
 *
 * @param {zhoujun} v
 * @returns
 *  -----表单字段------
 *  *prop： 编辑字段
 *  *label： 中文字
 *  formatter： 格式化字段值 val 表格值
 *  render：格式化字段值，可以是html val 表格值
 *  -----操作字段-------
 *  *btnList：表格按钮
 *      *name：按钮名称
 *      plain：Boolean,或不定义
 *      *handleClick：点击事件
 *      *isShow：Boolean 是否显示，可以用来做权限控制
 * 
 *  新增: 无formatter 、render, 有type
 *  详情: 有formatter 、render, 无type
 *   
 */

export const tableJson = function(v) {
    return [{
            prop: 'purchaseOrderCode',
            type: 'input',
            label: '订单编号',
        },
        {
            prop: 'orderDate',
            type: 'select',
            label: '订单日期',
            options: []
        },
        {
            prop: 'warehouseName',
            type: 'number',
            label: '仓库',
        },
        {
            prop: 'orderAmount',
            type: 'number',
            label: '金额',
        },
        {
            prop: 'dateee',
            type: 'date',
            label: '时间',
        },
        {
            prop: 'orderStatus',
            type: 'switch',
            label: '订单状态',
        },
        {
            prop: 'orderType',
            type: 'text',
            label: 'formatter',
            formatter: (val) => {
                return 111111;
            },
        },
        {
            prop: 'orderType',
            label: '是否已推送',
            render: (val) => {
                if (val) {
                    return `<div class="success-audit">是</div>`
                } else {
                    return `<div class="fail-audit">否</div>`
                }
            }
        },
        // {
        //     label: "操作",
        //     width: '300px',
        //     btnList: [{
        //             name: "详情",
        //             plain: true,
        //             handleClick: () => {
        //                 console.log(11111)
        //             },
        //             isShow: true
        //         },
        //         {
        //             name: "密码重置",
        //             plain: true,
        //             handleClick: () => {
        //                 console.log(22222222)
        //             },
        //             isShow: true
        //         }
        //     ]
        // }
    ];
};