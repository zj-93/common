<template>
  <section class="image-preview">
    <div class="images" v-viewer>
      <img v-for="src in imagesSrc" :src="src" :key="src">
    </div>
  </section>
</template>
<script>
import {IMG_URL} from "@/axios/Global"
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from "v-viewer"
export default {
  directives: {
      viewer: viewer({
          debug: true,
      }),
    },
  props:{
    imageArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
        imagesSrc:[]
    };
  },
  methods: {
    show() {
        this.imagesSrc = [];
        this.imagesSrc = this.imageArr.map(el =>{
            return `${IMG_URL}${el.path}?download=0&width=1000`
        })
        this.$nextTick(() =>{
            const viewer = this.$el.querySelector('.images').$viewer
            viewer.show();
        })
    }
  },
};
</script>
<style lang="scss">
.images img {
  display: none;
}
</style>