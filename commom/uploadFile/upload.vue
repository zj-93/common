<template>
  <div class="upload-img-component">
    <el-upload
      :action="uploadCertUrl"
      accept=".png,.jpg,.jpeg,.gif,.bmp"
      :headers="headers"
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :disabled="myFlag"
      :limit="limit"
      :on-success="handSuccess"

      :class="{ hide: myFlag || isHiden }"
    >
      <i class="el-icon-plus" :class="{ noIcon: isHiden }"></i>
    </el-upload>
    <div class="images" v-viewer>
      <img :src="item.src" v-for="(item, index) in imagesSrc" :key="index" />
    </div>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});

import { urlName3, BASE_URL } from "@/axios/Global";
export default {
  data() {
    return {
      uploadCertUrl: `${BASE_URL}${urlName3}/sys-fdfs-file/uploadFile`,
      fileListArr: [],
      imagesSrc: [],
      myFlag: false,
    };
  },
  props: {
    acceptList: {
      type: Object,
      default: () => {},
    },
    fileList: {
      type: Array,
      default: () => {
        return [
          //  {name:'',url:""}
        ];
      },
    },
    disabledFlag: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  watch: {
    disabledFlag: {
      handler(val) {
        this.myFlag = this.disabledFlag;
      },
      deep: true,
      immediate: true,
    },
    fileList(value) {
      this.imagesSrc = value.map((el) => {
        el.fileUrl = el.url
          if(el.id) {
            el.url = `${el.url}?download=0&width=100&height=100`
          }
          return {
            src:el.fileUrl,
          }
        // return { src: el.url };
      });
    },
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
    },
    isHiden() {
      let flag = "";
      if (this.fileList.length >= this.limit) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    },
  },
  methods: {
    show(index) {
      const viewer = this.$el.querySelector(".images").$viewer;
      viewer.view(index)
      viewer.show();
    },
    handleChange() {
      
    },
    handleRemove(file, fileList) {
      let index = this.imagesSrc.findIndex((value) => value.src == file.fileUrl);
      this.imagesSrc.splice(index, 1);
      if (this.imagesSrc.length < this.limit) {
        this.myFlag = false;
      }
      this.$emit("removeImg", file);
    },
    handlePictureCardPreview(file) {
      let index = this.imagesSrc.findIndex((value) => value.src == file.fileUrl);
      this.show(index);
    },
    handSuccess(response, file, fileList) {
      this.imagesSrc.unshift({ src: file.url });
      if (this.imagesSrc.length >= this.limit) {
        this.myFlag = true;
      }
      this.$emit("uploadImgSuccess", response);
    },
    handleError(err, file, fileList) {
      this.$error("图片上传失败，请从新上传！");
    },
    // 文件上传之前做文件大小校验
    beforeUpload(file) {
      console.log(file, 1111);
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 200MB!");
      }
      // .png, .jpg, .jpeg, .gif, .bmp
      let testmsg = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      const extension1 = testmsg === "png";
      const extension2 = testmsg === "jpg";
      const extension3 = testmsg === "jpeg";
      const extension4 = testmsg === "gif";
      const extension5 = testmsg === "bmp";
      if (
        !extension1 &&
        !extension2 &&
        !extension3 &&
        !extension4 &&
        !extension5
      ) {
        this.$info("仅限上传png,jpg,jpeg,gif,bmp格式!");
      }
      return (
        isLt2M &&
        (extension1 || extension2 || extension3 || extension4 || extension5)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.images img {
  display: none;
}
/deep/ .hide .el-upload--picture-card {
  display: none;
  border: 1px dashed #c0ccda !important;
}

.noIcon {
  display: none;
}

</style>
