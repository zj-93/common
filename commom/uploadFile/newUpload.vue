<template>
  <section class="upload-img-wrapper_2">
    <el-upload
      :class="{ hide: !isAdd }"
      :action="uploadImgUrl"
      :file-list="imgConfig.imgFileList"
      ref="imgUpload"
      :list-type="imgConfig.listType"
      :headers="postHeaders"
      :auto-upload="imgConfigAutoUpload"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :accept="imgConfig.accept"
      :limit="imgConfig.limitImgNum"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :multiple="imgConfig.multiple"
      :disabled="!isAdd"
    >
      <el-button size="small" type="primary" plain>点击上传</el-button>
      <i
        slot="default"
        class="el-icon-plus"
        v-if="imgConfig.imgFileList.length < imgConfig.limitImgNum && imgConfig.listType == 'picture-card'"
      ></i>
    </el-upload>
    <div class="images" v-viewer>
      <img :src="item.src" v-for="(item, index) in imagesSrc" :key="index" />
    </div>
  </section>
</template>
<script>
import "viewerjs/dist/viewer.css";
import { url_name_3, BASE_URL } from "@/axios/Global";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});

export default {
  props: {
    imgConfig: {
      type: Object,
      default: () => {
        return {
          accept: ".png, .jpg, .jpeg, .gif, .bmp",
        };
      },
    },
    isAdd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      disabled: false,
      hideUpload: false,
      imgConfigAutoUpload: true,
      postHeaders: {
        Authorization: `Bearer ${
          sessionStorage.getItem("TOKEN") || sessionStorage.getItem("token")
        }`,
      },
      uploadImgUrl: `${BASE_URL}${url_name_3}/sys-fdfs-file/uploadFile`,
      imgPreviewBigger: null,
      biggerImg: null,
      previewShow: false,
      src: null,
      imagesSrc: [],
    };
  },
  watch: {
    imgConfig: {
      handler(val) {
        this.imagesSrc = val.imgFileList.map((el) => {
          return {
            src: el.src || el.url,
          };
        });
        this.hideUpload =
          val.imgFileList.length >= val.limitImgNum || val.disabled;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    show(index) {
      const viewer = this.$el.querySelector(".images").$viewer;
      viewer.view(index);
      viewer.show();
    },
    submit() {
      this.imgConfig && this.$refs.imgUpload.submit();
    },
    // 图片上传成功
    handleSuccess(response, file, fileList) {
      this.imagesSrc.unshift({ src: file.url });
      if (response.status) {
        if (!Array.isArray(this.imgConfig.addImgList)) {
          this.imgConfig.addImgList = [];
        }
        this.imgConfig.addImgList.push(response.data.id);
        this.$emit("upload-success", response);
      } else {
        this.$nextTick(() => {
          this.imgConfig.imgFileList.pop();
        });
        this.$message({
          type: "error",
          message: response.msg,
        });
      }
    },
    // 图片上传触发
    handleChange(file, fileList) {
      this.imgConfig.imgFileList = fileList;
      this.hideUpload = fileList.length >= this.imgConfig.limitImgNum;
      // this.$emit("handle-change", file, fileList);
    },
    // 图片上传错误
    handleError(err, file, fileList) {
      this.$emit("handle-error", err, file, fileList);
    },
    // 图片上传超过限制
    handleExceed(file, fileList) {
      this.$info(`最多只能上传${this.imgConfig.limitImgNum}张图片！`);
      // this.$message.info(`最多只能上传一张图片！`);
    },
    // 文件上传之前做文件大小校验
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 200MB!");

        return isLt2M && !this.imgConfig.accept.includes(testmsg);
      }
      // .png, .jpg, .jpeg, .gif, .bmp
      let testmsg = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      // const extension1 = testmsg === "png";
      // const extension2 = testmsg === "jpg";
      // const extension3 = testmsg === "jpeg";
      // const extension4 = testmsg === "gif";
      // const extension5 = testmsg === "bmp";
      if (!this.imgConfig.accept.includes(testmsg)) {
        this.$info("仅限上传png,jpg,jpeg,gif,bmp格式!");
        return isLt2M && !this.imgConfig.accept.includes(testmsg);
      }
    },
    handleRemove(file, fileList) {
      this.imgConfig.imgFileList = fileList;
      if (file.status === "success") {
        this.imgConfig.addImgList.splice(
          this.imgConfig.addImgList.indexOf(file.id),
          1
        );
      }
      this.hideUpload = fileList.length >= this.imgConfig.limitImgNum;
      let index = this.imagesSrc.findIndex((value) => value.src == file.src);
      this.imagesSrc.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      let index = this.imagesSrc.findIndex((value) => value.src == file.src);
      this.src = `${file.url}?download=0&width=200&height=200`;
      this.show(index);
    },
  },
};
</script>
<style lang="scss">
.upload-img-wrapper_2 {
  .images img {
    display: none;
  }
  .hide .el-upload--picture-card {
    display: none;
  }
}
</style>