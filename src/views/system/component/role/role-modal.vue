<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.dialogVisible"
    width="55%"
    center
    :close-on-click-modal="false"
  >
    <!-- 新增-查看-修改 -->
    <el-form
      v-if="dialog.dialogType === 'dialog'"
      :model="dialog.dialogForm"
      ref="dialog.dialogForm"
      label-width="120px"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="dialog.dialogForm.roleName" :disabled="dialog.disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="parent">
          <el-form-item label="上级角色" prop="parentId">
            <el-cascader
              :options="roleModifyTree"
              :props="{checkStrictly: true }"
              clearable
              v-model="dialog.dialogForm.parentId"
              :disabled="dialog.disable"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 用户配置 -->
    <el-form v-else-if="dialog.dialogType === 'userConfig'" style="text-align: center">
      <el-transfer
        style="text-align: left; display: inline-block"
        :data="allUserResult"
        v-model="selectUser"
      ></el-transfer>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="!dialog.disable">
      <el-button @click="cancelHandle()">取 消</el-button>
      <el-button type="primary" @click="dialogFormSubmit('dialog.dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RoleModal",
  props: ["dialog", "role"],
  data() {
    console.log("this.dialog.transferArr=", this.dialog.transferArr);
    return {
      // 必填校验
      rules: {
        roleName: {
          required: true,
          message: "请输入角色名称",
          trigger: "blur"
        },
        parentId: {
          required: true,
          message: "请输入上级角色",
          trigger: "blur"
        }
      },
      selectUser: this.dialog.transferArr
    };
  },
  computed: {
    ...mapGetters([
      "rolePageResult",
      "roleTreeListResult",
      "roleModifyTree",
      "roleCreateResult",
      "allUserResult"
    ])
  },
  methods: {
    ...mapActions("system", ["roleCreateAction"]),
    // 提交
    dialogFormSubmit(dialogForm) {
      this.$refs[dialogForm].validate(valid => {
        if (valid) {
          const data = {
            parentId: this.dialog.dialogForm.parentId.pop(),
            roleName: this.dialog.dialogForm.roleName,
            sort: "1"
          };
          console.log("data=", data);

          const searchParam = {
            param: {},
            extraInfo: {
              menuNameLike: this.role.form.menuNameLike
            },
            pageSize: this.role.pageSize,
            pageNum: this.role.currentPage
          };
          const result = {
            data,
            searchParam
          };

          this.roleCreateAction(result);
          const timer = setInterval(() => {
            if (
              this.roleCreateResult &&
              this.roleCreateResult.success === true
            ) {
              clearInterval(timer);
              this.dialog.dialogVisible = false; //关闭对话框
            }
          }, 10);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消
    cancelHandle() {
      this.dialog.dialogVisible = false; //关闭对话框
      this.dialog.dialogForm = {};
    }
  }
};
</script>

<style lang="scss" scoped>
.parent .el-cascader {
  width: 250px;
}
</style>