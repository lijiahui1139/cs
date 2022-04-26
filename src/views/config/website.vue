<template>
  <div>
    <el-table :data="tableDataList">
      <el-table-column align="center" label="类型" prop="type">
        <template slot-scope="scope">{{ $t(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column align="center" label="内容" prop="contentData">
        <template slot-scope="scope">
          <span v-if="scope.row.content == 'NftDefaultVerify'">
            <span v-if="scope.row.contentData == '0'">
              {{ $t("config.manual") }}
            </span>
            <span v-else> {{ $t("config.auto") }}</span>
          </span>
          <span v-else-if="scope.row.content == 'networkId'">
            <!-- {{ scope.row.contentData }} -->
            {{ networkIdDataObj[scope.row.contentData] }}
          </span>
          <span v-else>
            {{ scope.row.contentData }}
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
        <div class="item-label">{{ $t("config.site") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'WebSite' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.WebSite }}</div>
          <el-link
            type="danger"
            @click="editConfig('WebSite', config.WebSite)"
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
        <div class="item-label">{{ $t("config.staticUrl") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'StaticPath' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.StaticPath }}</div>
          <el-link
            type="danger"
            @click="editConfig('StaticPath', config.StaticPath)"
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
        <div class="item-label">{{ $t("config.nftVerify") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'NftDefaultVerify' || edit.status != 'edit'"
        >
          <div class="show-value">
            <el-tag type="info" v-if="config.NftDefaultVerify == '0'">{{
              $t("config.manual")
            }}</el-tag>
            <el-tag type="success" v-else-if="config.NftDefaultVerify == '1'">{{
              $t("config.auto")
            }}</el-tag>
          </div>
          <el-link
            type="danger"
            @click="editConfig('NftDefaultVerify', config.NftDefaultVerify)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-radio-group v-model="edit.data">
              <el-radio :label="'0'">{{ $t("config.manual") }}</el-radio>
              <el-radio :label="'1'">{{ $t("config.auto") }}</el-radio>
            </el-radio-group>
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
        <div class="item-label">{{ $t("config.loginMessage") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'LoginMessage' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.LoginMessage }}</div>
          <el-link
            type="danger"
            @click="editConfig('LoginMessage', config.LoginMessage)"
            >{{ $t("global.edit") }}</el-link
          >
        </div>
        <div class="item-value" v-else>
          <div class="show-value input-value">
            <el-input type="textarea" :rows="2" v-model="edit.data"></el-input>
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
        <div class="item-label">{{ $t("config.ethRPC") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'ChainApiUrl' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.ChainApiUrl }}</div>
          <el-link
            type="danger"
            @click="editConfig('ChainApiUrl', config.ChainApiUrl)"
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
        <div class="item-label">{{ $t("config.networkId") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'networkId' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.networkId }}</div>
          <el-link
            type="danger"
            @click="editConfig('networkId', config.networkId)"
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
        <div class="item-label">{{ $t("config.LastBlock") }}</div>
        <div
          class="item-value"
          v-if="edit.name != 'LastBlock' || edit.status != 'edit'"
        >
          <div class="show-value">{{ config.LastBlock }}</div>
          <el-link
            type="danger"
            @click="editConfig('LastBlock', config.LastBlock)"
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
import { WebsiteTableData, networkIdData } from "./tableContent";
import upDataDialog from "./components/upDataDialog.vue";
export default {
  name: "Website",
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
      networkIdDataObj: {},
    };
  },
  created() {
    WebsiteTableData.forEach((item) => {
      for (const key in this.config) {
        if (item.content == key) {
          item.contentData = this.config[key];
        }
      }
    });
    this.tableDataList = WebsiteTableData;
    this.networkIdDataObj = networkIdData;
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
</style>

