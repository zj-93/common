import Vue from 'vue'

function siblings(elm) {
    var a = []; //保存所有兄弟节点
    var p = elm.parentNode.children; //获取父级的所有子节点
    for (var i = 0; i < p.length; i++) { //循环
        if (p[i].nodeType == 1 && p[i] != elm) { //如果该节点是元素节点与不是这个节点本身
            a.push(p[i]); // 添加到兄弟节点里
        }
    }
    return a;
}

Vue.directive('height', {
    bind: function(el) {
        // 聚焦元素
        // let nodes = document.getElementById(el.id)
        // console.log(el, nodes, 1)
    },
    inserted: function(el) {
        window.onresize = function() {
            let detailTitleH = 64
            let parentNodesH = el.parentNode.clientHeight
            let nodes = document.getElementById(el.id)
            let sibNodes = siblings(nodes)
            let exitH = 0
            sibNodes.forEach(el => {
                exitH += el.clientHeight
            })
            el.style.height = parentNodesH - exitH - detailTitleH + 'px'
        }

    },
    update: function(el) {
        let detailTitleH = 64
        let parentNodesH = el.parentNode.clientHeight
        let nodes = document.getElementById(el.id)
        let sibNodes = siblings(nodes)
        let exitH = 0
        sibNodes.forEach(el => {
            exitH += el.clientHeight
        })
        el.style.height = parentNodesH - exitH - detailTitleH + 'px'
    }
})