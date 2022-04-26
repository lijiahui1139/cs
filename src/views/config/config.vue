<template>
  <div class="app-container config-container" v-if="config">
    <el-tabs v-model="tab" @tab-click="handleTab">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :label="item.label"
        :name="item.name"
        :key="index"
      >
        <website
          :config="config"
          v-if="item.name == 'website'"
          @init="init"
        ></website>
        <contract
          :config="config"
          v-else-if="item.name == 'contract'"
          @init="init"
        ></contract>
        <ipfs
          :config="config"
          v-else-if="item.name == 'ipfs'"
          @init="init"
        ></ipfs>
        <pledge
          :config="config"
          v-else-if="item.name == 'pledge'"
          @init="init"
        ></pledge>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Website from "./website";
import Contract from "./contract";
import Ipfs from "./ipfs";
import Pledge from "./pledge";
export default {
  components: {
    Website,
    Contract,
    Ipfs,
    Pledge,
  },
  name: "Network",
  data() {
    return {
      tab: "website",
      tabs: [
        { name: "website", label: this.$t("config.website") },
        { name: "contract", label: this.$t("config.contract") },
        { name: "ipfs", label: this.$t("config.ipfs") },
        { name: "pledge", label: this.$t("config.pledge") },
      ],
      config: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleTab(tab, event) {},
    init() {
      this.$api("config.fetch").then((res) => {
        if (this.$tool.checkResponse(res)) {
          this.config = res.data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>


