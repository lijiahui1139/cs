<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.date"
        type="date"
        class="filter-item width-200px"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item width-200px ml-20"
        :placeholder="$t('pledge.placeholder')"
      />
      <el-button
        v-permission="['GET /admin/log/list']"
        class="filter-item ml-20"
        type="primary"
        >{{ $t("pledge.select") }}</el-button
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
      <el-table-column align="center" :label="$t('pledge.awardTime')" prop="" />
      <el-table-column align="center" :label="$t('pledge.periods')" prop="" />
      <el-table-column
        align="center"
        :label="$t('pledge.ETHAddress')"
        prop=""
      />
      <el-table-column
        align="center"
        :label="$t('pledge.FILAddress')"
        prop=""
      />

      <el-table-column
        align="center"
        :label="$t('pledge.awardMoney')"
        prop=""
      />
    </el-table>
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    /> -->
  </div>
</template>

<script>
export default {
  name: "award",
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        listQuery: undefined,
        sort: "create_time",
        order: "desc",
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.width-200px {
  width: 200px;
}
</style>