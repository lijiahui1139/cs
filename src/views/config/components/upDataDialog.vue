<template>
  <div>
    <el-dialog title="修改矿池" :visible.sync="show" width="920px">
      <el-form :model="formData" label-position="left" :inline="true">
        <el-form-item label="类型">
          <el-input v-model="formData.type" disabled />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-if="formData.content != 'NftDefaultVerify'"
            v-model="formData.contentData"
          />
          <el-radio-group v-else v-model="formData.contentData">
            <el-radio :label="'0'">{{ $t("config.manual") }}</el-radio>
            <el-radio :label="'1'">{{ $t("config.auto") }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateConfig">确 定</el-button>
        <el-button class="cancel" @click="show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      show: false,
      formData: {
        type: "",
        contentData: "",
        content: "",
      },
    };
  },
  methods: {
    updateConfig() {
      this.$confirm(this.$t("global.updateTip"), this.$t("global.tip"), {
        confirmButtonText: this.$t("global.confirm"),
        cancelButtonText: this.$t("global.cancel"),
      })
        .then(() => {
          var data = {
            key: this.formData.content,
            value: this.formData.contentData,
          };
          this.$api("config.update", data)
            .then((res) => {
              if (this.$tool.checkResponse(res)) {
                this.$notify.success({
                  title: this.$t("global.success"),
                  message: this.$t("global.updateSuccess"),
                });
                this.show = false;
                this.formData = { type: "", contentData: "", content: "" };
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
        })
        .catch();
    },
  },
};
</script>
<style   scoped>
::v-deep .el-form {
  display: flex;
  flex-direction: column;
}
::v-deep .el-form-item {
  margin-right: 0 !important;
  display: flex;
}
::v-deep .el-form-item__content {
  flex: 1;
}
</style>