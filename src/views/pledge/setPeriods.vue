<template>
  <!-- 期数设置 -->
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-date-picker
        v-model="listQuery.date"
        type="date"
        class="filter-item width-200px"
        placeholder="选择日期"
      >
      </el-date-picker> -->
      <el-input
        v-model="listQuery.periodNumbe"
        clearable
        class="filter-item width-200px"
        :placeholder="$t('pledge.placeholder')"
      />
      <el-button class="filter-item ml-20" type="primary" @click="getList">{{
        $t("pledge.select")
      }}</el-button>
      <el-button
        class="filter-item ml-20"
        type="primary"
        @click="ordinaryNew"
        >{{ $t("pledge.ordinaryNew") }}</el-button
      >
      <el-button
        class="filter-item ml-20"
        type="primary"
        @click="aBatchOfNew"
        >{{ $t("pledge.aBatchOfNew") }}</el-button
      >
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="$t('pledge.loadingText')"
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        :label="$t('pledge.periods')"
        prop="periodNumber"
      />
      <el-table-column
        align="center"
        :label="$t('pledge.startTime')"
        prop="startTime"
      />
      <el-table-column
        align="center"
        :label="$t('pledge.entTime')"
        prop="entTime"
      />
      <el-table-column
        align="center"
        :label="$t('pledge.status')"
        prop="status"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未启用</span>
          <span v-else-if="scope.row.status == 1">启用中</span>
          <span v-else-if="scope.row.status == 2">已结束</span>
          <span v-else-if="scope.row.status == 3">暂停</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('pledge.operation')">
        <template slot-scope="scope">
          <el-link
            style="color: #8a9adf"
            @click="edit(scope.row)"
            :underline="false"
            >
            <!-- {{ $t("systemManagement.edit") }} -->
            {{ $t("systemManagement.delete") }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <data-dialog ref="dialog" :title="title" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import dataDialog from "./components/dataDialog.vue";
export default {
  name: "award",
  components: { Pagination, dataDialog },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        periodNumbe: undefined,
        // listQuery: undefined,
        sort: "create_time",
        order: "desc",
      },
      title: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$api("pledge.list", this.listQuery)
        .then((res) => {
          if (res.errno == 0) {
            this.list = res.data.records;
            this.total = res.data.total;
            this.listLoading = false;
          } else {
          }
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
    },
    ordinaryNew() {
      this.title = "普通新增";
      this.$refs.dialog.show = true;
    },
    aBatchOfNew() {
      this.title = "批量新增";
      this.$refs.dialog.show = true;
    },
    edit(row) {
      this.title = "修改";
      this.$refs.dialog.show = true;
      this.$refs.dialog.formData = {
        periodNumber: row.periodNumber,
        periodTime: [row.startTime, row.entTime],
        status: row.status == 0 ? row.status.toString() : "",
      };
    },
  },
};
</script>
<style scoped>
.width-200px {
  width: 200px;
}
</style>