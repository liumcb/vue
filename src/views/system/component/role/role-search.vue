<template>
  <div>
    <el-form ref="role.form" :model="role.form" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="角色名称">
            <el-input v-model="role.form.roleNameLike"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="search('role.form')">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="add()">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RoleSearch",
  props: ["role", "dialog"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("system", ["rolePageAction"]),
    // 查询
    search(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 查询时重新把pageSize修改为10和currentPage修改为1
          this.pageSize = 10;
          this.currentPage = 1;
          const data = {
            param: {},
            extraInfo: {
              roleNameLike: this.role.form.roleNameLike
            },
            pageSize: this.role.pageSize,
            pageNum: this.role.currentPage
          };
          console.log("得到的data==", data);
          this.rolePageAction(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    add() {
      console.log("点击新增");
      this.dialog.dialogType = "dialog";
      this.$emit("showInsurInformation");
    }
  }
};
</script>