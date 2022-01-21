<template>
  <section class="upload-wrapper">
    <el-upload
      :class="{
        hide:
          imgConfig.imgFileList.length >= imgConfig.limitImgNum || imgConfig.disabled
      }"
      :action="uploadImgUrl"
      :file-list="imgConfig.imgFileList"
      ref="imgUpload"
      list-type="picture-card"
      :headers="postHeaders"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      accept=".png, .jpg, .jpeg, .gif, .bmp"
      :limit="imgConfig.limitImgNum"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :multiple="imgConfig.multiple"
      :disabled="imgConfig.disabled"
    >
      <i slot="default" class="el-icon-plus" v-if="!imgConfig.disabled"></i>
    </el-upload>
    <div class="images" v-viewer>
      <img :src="item.src" v-for="item in imagesSrc" :key="item.id" />
    </div>
  </section>
</template>
<script>
import "viewerjs/dist/viewer.css";
import { urlName3, BASE_URL } from "@/axios/Global";
import Viewer from "v-viewer";
import Vue from "vue";
import {IMG_URL} from "@/axios/Global"
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
        return {};
      },
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
      uploadImgUrl: `${BASE_URL}${urlName3}/sys-fdfs-file/uploadFile`,
      imgPreviewBigger: null,
      biggerImg: null,
      previewShow: false,
      src: null,
      imagesSrc: [],
    };
  },
 watch: {
      imgConfig: {
        handler(value){
          this.imagesSrc = value.imgFileList.map(el =>{
          el.url = `${IMG_URL}${el.path}?download=0&width=100&height=100`
          return {
            src:`${IMG_URL}${el.path}?download=0&width=1500`,
            id: el.id,
            fileName: new Date().getTime(),
          };
        });
        this.hideUpload =
          this.imgConfig.imgFileList.length >= this.imgConfig.limitImgNum
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    console.log(this.imgConfig);
  },
  methods: {
    show(index) {
      const viewer = this.$el.querySelector(".images").$viewer;
      viewer.view(index);
      viewer.show();
    },
    vaildPic() {
      console.log(this.imgConfig.imgFileList, this.imgConfig.addImgList)

      if(this.imgConfig.imgFileList.length != this.imgConfig.addImgList.length) {
         this.$message({
           type: 'warning',
           message: '图片上传中，请等待'
         })
         return false;
       } else {
         return true;
       }
    },
    // 图片上传成功
    handleSuccess(response, file, fileList) {
      this.imgConfig.imgFileList = fileList.map((el) => {
        if (el.id) {
          return {
            ...el,
          };
        } else {
          if (el.response) {
            return {
              ...el.response.data,
            };
          } else {
            return {
              ...el,
            };
          }
        }
      });
      this.imagesSrc.unshift({ src: file.url });
      if (response.status) {
        this.imgConfig.uploadSuccessImgNum++;
        if (!Array.isArray(this.imgConfig.addImgList)) {
          this.imgConfig.addImgList = [];
        }
        this.imgConfig.addImgList.push(response.data.id);
        if (
          this.imgConfig.uploadSuccessImgNum === this.imgConfig.uploadImgNum
        ) {
          this.imgConfig.submitFlag = true;
          this.$emit("upload-success");
        }
      console.log(this.imgConfig.addImgList, 'this.imgConfig.addImgList')
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
      if(file.status == 'ready') {
        this.imgConfig.imgFileList.push(file)
      }
      if (fileList.length > 0) {
        this.imgConfig.uploadImg = true;
      }
      this.imgConfig.uploadImgNum =
        fileList.length - this.imgConfig.uploadedImgNum;
      this.hideUpload = fileList.length >= this.imgConfig.limitImgNum;
      // this.$emit("handle-change", file, fileList);
      console.log(this.imgConfig.imgFileList, 'this.imgConfig.imgFileList')
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
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 20MB!");
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
    handleRemove(file, fileList) {
      this.imgConfig.imgFileList = fileList;
      this.imgConfig.uploadImg = fileList.length > 0;
      if (file.status === "success") {
        this.imgConfig.addImgList.splice(
          this.imgConfig.addImgList.indexOf(file.id),
          1
        );
        this.imgConfig.uploadedImgNum--;
      }
      this.imgConfig.uploadImgNum =
        fileList.length - this.imgConfig.uploadedImgNum;
      this.hideUpload = fileList.length >= this.imgConfig.limitImgNum;
      let index = this.imagesSrc.findIndex((value) => value.id == file.id);
      this.imagesSrc.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      let index = this.imagesSrc.findIndex((value) => value.id == file.id);
      this.src = file.url;
      this.show(index);
    },
  },
};
</script>
<style>
.upload-wrapper .images img {
  display: none;
}
.upload-wrapper .hide .el-upload--picture-card {
  display: none;
}
</style>