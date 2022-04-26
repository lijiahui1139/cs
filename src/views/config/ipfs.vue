<template>
  <div>
    <el-table :data="tableDataList">
      <el-table-column align="center" label="类型" prop="type">
        <template slot-scope="scope">{{ $t(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column align="center" label="内容" prop="contentData">
        <template slot-scope="scope">
          <span v-if="scope.row.content != 'NftDefaultVerify'">
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
    <!-- <div class="config-group">
      <div class="config-item">
        <div class="item-label">{{ $t("config.ipfsUrl") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'ipfsUrl' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.ipfsUrl }}</div>
          <el-link
            type="danger"
            @click="editConfig('ipfsUrl', config.ipfsUrl)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-input v-model="edit.data"></el-input>
          </div>
          <el-link class="mr-10" type="primary" @click="updateConfig">{{
            $t("global.update")
          }}</el-link>
          <el-link type="info" @click="cancelConfig">{{
            $t("global.cancel")
          }}</el-link>
        </div>
      </div>

      <div class="config-item">
        <div class="item-label">{{ $t("config.IpfsServerIp") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'IpfsServerIp' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.IpfsServerIp }}</div>
          <el-link
            type="danger"
            @click="editConfig('IpfsServerIp', config.IpfsServerIp)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-input v-model="edit.data"></el-input>
          </div>
          <el-link class="mr-10" type="primary" @click="updateConfig">{{
            $t("global.update")
          }}</el-link>
          <el-link type="info" @click="cancelConfig">{{
            $t("global.cancel")
          }}</el-link>
        </div>
      </div>

      <div class="config-item">
        <div class="item-label">{{ $t("config.IpfsServerPort") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'IpfsServerPort' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.IpfsServerPort }}</div>
          <el-link
            type="danger"
            @click="editConfig('IpfsServerPort', config.IpfsServerPort)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-input v-model="edit.data"></el-input>
          </div>
          <el-link class="mr-10" type="primary" @click="updateConfig">{{
            $t("global.update")
          }}</el-link>
          <el-link type="info" @click="cancelConfig">{{
            $t("global.cancel")
          }}</el-link>
        </div>
      </div>

      <div class="config-item">
        <div class="item-label">{{ $t("config.StorageLocalPath") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'StorageLocalPath' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.StorageLocalPath }}</div>
          <el-link
            type="danger"
            @click="editConfig('StorageLocalPath', config.StorageLocalPath)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-input v-model="edit.data"></el-input>
          </div>
          <el-link class="mr-10" type="primary" @click="updateConfig">{{
            $t("global.update")
          }}</el-link>
          <el-link type="info" @click="cancelConfig">{{
            $t("global.cancel")
          }}</el-link>
        </div>
      </div>

      <div class="config-item">
        <div class="item-label">{{ $t("config.IpfsRemoteServer") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'IpfsRemoteServer' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.IpfsRemoteServer }}</div>
          <el-link
            type="danger"
            @click="editConfig('IpfsRemoteServer', config.IpfsRemoteServer)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-input v-model="edit.data"></el-input>
          </div>
          <el-link class="mr-10" type="primary" @click="updateConfig">{{
            $t("global.update")
          }}</el-link>
          <el-link type="info" @click="cancelConfig">{{
            $t("global.cancel")
          }}</el-link>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { ipfsTableData } from "./tableContent";
import upDataDialog from "./components/upDataDialog.vue";
export default {
  name: "IPFS",
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
    ipfsTableData.forEach((item) => {
      for (const key in this.config) {
        if (item.content == key) {
          item.contentData = this.config[key];
        }
      }
    });
    this.tableDataList = ipfsTableData;
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
