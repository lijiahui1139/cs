<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="show"
      width="920px"
      @closed="closed"
    >
      <el-form
        :model="formData"
        label-position="left"
        :inline="true"
        label-width="80px"
        v-if="title == '修改'"
        ref="formData"
      >
        <el-form-item label="期数">
          <el-input v-model="formData.periodNumber" />
        </el-form-item>
        <el-form-item label="期数时间">
          <el-date-picker
            v-model="formData.periodTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" v-if="formData.statu">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        label-position="left"
        :inline="true"
        label-width="80px"
        v-if="title == '普通新增'"
        ref="formData"
      >
        <el-form-item label="期数时间">
          <el-date-picker
            v-model="formData.periodTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        label-position="left"
        :inline="true"
        label-width="80px"
        v-if="title == '批量新增'"
        ref="formData"
      >
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="新增期数">
          <el-input v-model="formData.addPeriodNumber" />
        </el-form-item>
        <el-form-item label="每期天数">
          <el-input v-model="formData.eachDays" />
        </el-form-item>
        <el-form-item label="间隔天数">
          <el-input v-model="formData.intervalDays" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="formData.entTime" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="show = false">取 消</el-button
        ><el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { string } from "clipboard";
export default {
  props: {
    title: {
      type: string,
    },
  },
  data() {
    return {
      show: false,
      formData: {
        periodNumber: "",
        periodTime: "",
        status: "",
        addPeriodNumber: "",
        eachDays: "",
        intervalDays: "",
        startTime: "",
        entTime: "",
      },
      statusDict: [
        {
          value: "0",
          label: "未启用",
        },
        {
          value: "3",
          label: "暂停",
        },
      ],
    };
  },
  methods: {
    confirm() {},
    closed() {
      this.formData = {
        periodNumber: "",
        periodTime: "",
        status: "",
        addPeriodNumber: "",
        eachDays: "",
        intervalDays: "",
      };
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
::v-deep .el-range-editor,
::v-deep .el-select,
::v-deep .el-date-editor {
  width: 100%;
}
</style>