<template>
  <div>
    <el-table :data="tableDataList">
      <el-table-column align="center" label="类型" prop="type">
        <template slot-scope="scope">{{ $t(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column align="center" label="内容" prop="contentData">
        <template slot-scope="scope">
          <span v-if="scope.row.content == 'clearingMethod'">
            <span v-if="scope.row.contentData == '0'">{{
              $t("config.manual")
            }}</span>
            <span v-else>{{ $t("config.auto") }}</span>
          </span>
          <span v-else-if="scope.row.content != 'NftDefaultVerify'">
            {{ scope.row.contentData }}
          </span>
          <span v-else>
            <span v-if="scope.row.contentData == '0'">{{
              $t("config.manual")
            }}</span>
            <span v-else>{{ $t("config.auto") }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            style="color: #7788d2"
            :underline="false"
            @click="update(scope.row)"
          >
            {{ $t("global.edit") }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <up-data-dialog ref="upDataDialog" @init="init" />
  </div>
</template>
<script>
import { pledgeTableData } from "./tableContent";
import upDataDialog from "./components/upDataDialog.vue";
export default {
  name: "Pledge",
  components: { upDataDialog },
  props: {
    config: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      edit: {
        name: null,
        status: null,
        data: "",
      },
      tableDataList: [],
    };
  },
  created() {
    pledgeTableData.forEach((item) => {
      for (const key in this.config) {
        if (item.content == key) {
          item.contentData = this.config[key];
        }
      }
    });
    this.tableDataList = pledgeTableData;
  },
  methods: {
    init() {
      this.$emit("init");
    },
    update(row) {
      this.$refs.upDataDialog.show = !this.$refs.upDataDialog.show;
      row.type = this.$t(row.type);
      this.$refs.upDataDialog.formData = row;
    },
    editConfig(name, data) {
      this.edit = {
        name: name,
        status: "edit",
        data: data,
      };
    },
    cancelConfig() {
      this.edit = { name: "", status: "", data: "" };
    },
    updateConfig() {
      this.$confirm(this.$t("global.updateTip"), this.$t("global.tip"), {
        confirmButtonText: this.$t("global.confirm"),
        cancelButtonText: this.$t("global.cancel"),
      }).then(() => {
        var data = {
          key: this.edit.name,
          value: this.edit.data,
        };
        this.$api("config.update", data)
          .then((res) => {
            if (this.$tool.checkResponse(res)) {
              this.$notify.success({
                title: this.$t("global.success"),
                message: this.$t("global.updateSuccess"),
              });
              this.cancelConfig();
              this.$emit("init");
            } else {
              this.$notify.error({
                title: this.$t("global.fail"),
                message: res.errmsg,
              });
            }
          })
          .catch((res) => {
            this.$notify.error({
              title: this.$t("global.fail"),
              message: this.$t("response." + res.data.errno),
            });
          });
      });
    },
  },
};
</script>
<style scoped>
::v-deep .el-table__header {
  width: 100% !important;
}
::v-deep .el-table__empty-block {
  width: 100% !important;
}
::v-deep .el-table__body {
  width: 100% !important;
}
