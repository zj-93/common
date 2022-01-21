<template>
  <div id="goodsDialog" ref="goodsDialog">
    <!--   搜索栏    -->
    <div class="search-box">
      <search-bar
        :datas="searchData"
        @handle-reset="handleReset"
        @handle-search="handleSearch"
      ></search-bar>
    </div>
    <!--   视图切换   -->
    <div class="com-display-tab">
      <div
        class="display-item"
        :class="{ active: visibleModel === '1' }"
        @click="visibleModel = '1'"
      >
        <i class="iconfont">&#xe61f;</i>
        列表
      </div>
      <!-- <div class="display-item" :class="{ active: visibleModel === '2' }" @click="visibleModel = '2'">
        <i class="iconfont">&#xe620;</i>
        视图
      </div> -->
    </div>
    <!--    列表    -->
    <table-component
      v-if="visibleModel === '1'"
      :tableData="tableData"
      :tableHeight="tableHeight"
      @dblclick="dblclick"
    >
      <el-table-column
        type="index"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in tableConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
        :sortable="item.sortable"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </table-component>

    <!--    视图    -->
    <div class="com-table-list" v-else>
      <div
        class="table-item"
        v-for="(item, index) in tableData"
        :key="index"
        @dblclick="tableDblclick(item)"
      >
        <div class="table-left">
          <div class="img-preview-item">
            <img
              :src="
                item.outerPackagePictureInfo.length
                  ? item.outerPackagePictureInfo[0].url
                  : ''
              "
              :onerror="defaultImg"
              alt=""
            />
            <div class="bigger-view-warpper">
              <i
                class="el-icon-search"
                @click="preview(item.outerPackagePictureInfo)"
              ></i>
            </div>
          </div>
        </div>
        <div class="table-right">
          <div class="table-content">
            <el-row>
              <el-col
                v-for="(items, i) in item.info"
                :key="i"
                :span="items.span"
              >
                <div class="c-item">
                  <div class="c-label">{{ items.label }}</div>
                  :
                  <div class="c-content">{{ items.value }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div class="operate-pager">
      <table-pagination
        @size-change="changeSize"
        @page-change="changePage"
        :pageNum="pageNum"
        :pageSize="pageSize"
        :total="total"
      ></table-pagination>
    </div>
    <div class="img-preview-bigger" v-show="previewShow">
      <div class="img-preview-bigger-mask"></div>
      <img :src="src" alt id="biggerImg" />
      <div class="gather">
        <div class="gather">
          <i class="el-icon-circle-close" @click="closePreview"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar/searchBar";
import tableComponent from "@/components/table/table_2";
import tablePagination from "@/components/tableGroup/tablePagination";
export default {
  props: {
    tableConfig: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    info: {
      type: Array,
      default: () => [
        {
          span: 9,
          label: "物资名称",
          value: "",
          key: "materialName",
        },
        {
          span: 6,
          label: "单位",
          value: "",
          key: "materialUnit",
        },
        {
          span: 9,
          label: "通用名",
          value: "",
          key: "trivialName",
        },
        {
          span: 9,
          label: "物资编码",
          value: "",
          key: "materialCode",
        },
        {
          span: 6,
          label: "规格",
          value: "",
          key: "materialSpce",
        },
        {
          span: 9,
          label: "供应商",
          value: "",
          key: "supplyName",
        },
        {
          span: 9,
          label: "物资分类",
          value: "",
          key: "materialCategoryName",
        },
        {
          span: 6,
          label: "单价",
          value: "",
          key: "unitPrice",
        },
        {
          span: 9,
          label: "生产厂家",
          value: "",
          key: "factoryName",
        },
      ],
    },
    total: {
      type: Number,
      default: 0,
    },
    searchConfig: {
      type: Array,
      default: () => [],
    },
    searchForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // searchConfig: {
      //   // 搜索栏配置
      //   data: {
      //     materialName: ""
      //   },
      //   config: [{
      //     label: "物资名称",
      //     prop: "materialName",
      //     type: "text"
      //   }],
      // },
      visibleModel: "1", // 物资显示模式 1 列表 2 视图
      pageNum: 1,
      pageSize: 10,
      tableHeight: 400,
      imgPreviewBigger: null,
      biggerImg: null,
      previewShow: false,
      src: null,
    };
  },
  computed: {
    defaultImg() {
      return 'this.src = "' + require("../../assets/image/lack.png") + '"';
    },
    searchData() {
      return {
        data: this.searchForm,
        config: this.searchConfig,
      };
    },
  },
  created() {
    this.$emit('getList', {pageNum: this.pageNum, pageSize: this.pageSize});
  },
  mounted() {},
  watch: {},
  methods: {
    dblclick(row, column, event) {
      this.$emit("dblclick", row);
    },
    tableDblclick(row) {
      this.$emit("dblclick", row);
    },
    handleSearch() {
      this.pageNum = 1;
      this.$emit('getList', {pageNum: this.pageNum, pageSize: this.pageSize});
    },
    handleReset() {
      this.searchForm.materialName = "";
      this.pageNum = 1;
      this.$emit('getList', {pageNum: this.pageNum, pageSize: this.pageSize});
    },
    changeSize(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.$emit('getList', {pageNum: this.pageNum, pageSize: this.pageSize});
    },
    // 改变页面
    changePage(page) {
      this.pageNum = page;
      this.$emit('getList', {pageNum: this.pageNum, pageSize: this.pageSize});
    },
    preview(path) {
      if (path.length) {
        this.previewShow = true;
        this.src = path[0].url;
      }
    },
    closePreview() {
      this.previewShow = false;
      this.src = null;
    },
  },
  components: {
    tableComponent,
    tablePagination,
    searchBar,
  },
};
</script>

<style lang="less"></style>
