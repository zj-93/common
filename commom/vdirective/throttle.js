import Vue from "vue"
// 节流指令
Vue.directive('throttle', {
    inserted: function(el, binding) {
        let { fn, event = "click", delay = 800 } = binding.value;
        window.timer = null;
        window.flag = true;
        el.addEventListener(event, () => {
            if (window.flag) {
                fn.apply(this, arguments);
                window.flag = false;
                clearTimeout(window.timer);
            }
            window.timer = setTimeout(() => {
                window.flag = true;
            }, delay);
        });
    }
})

// 指令绑定示例  函数需携带参数  v-throttle="{fn:() => reset('delete')}" 默认'click' 时间800 
//  v-throttle="{fn:reset,event:'focus',delay:3000}" // @click="rest"  v-throttle="{fn:reset,event:'click'}"