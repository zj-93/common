import Vue from 'vue';
window.flag = null;
Vue.directive('stop', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 1000);
            }
        });
    },
});