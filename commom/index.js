// import Vue from 'vue'
import bkFormComponents from '@/commom/bkForm/editOrDetail.vue'


// 这里是重点
const BkForm = {
    install: function(Vue) {
        Vue.component('BKForm', bkFormComponents)
    }
}

export default BkForm