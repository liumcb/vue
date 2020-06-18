<template>
  <div>
    <RoleSearch :role="role" :dialog="dialog" @showInsurInformation="showInsurInformation"></RoleSearch>
    <RoleTable :role="role" :dialog="dialog"></RoleTable>
    <RoleModal :dialog="dialog" :role="role"></RoleModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// 引入组件
import RoleSearch from "./component/role/role-search";
import RoleTable from "./component/role/role-talbe";
import RoleModal from "./component/role/role-modal";

export default {
  name: "role",
  data() {
    return {
      // 传入子组件的数据
      role: {
        form: {
          roleNameLike: ""
        },
        pageSize: 10,
        currentPage: 1
      },
      dialog: {
        dialogVisible: false,
        title: "添加菜单",
        disable: false,
        dialogForm: {
          roleName: "",
          parentId: ""
        },
        dialogType: "dialog"
      }
    };
  },
  components: {
    RoleSearch,
    RoleTable,
    RoleModal
  },
  // 初始化调用
  created() {
    // 进来调用菜单页面
    const data = {
      param: {},
      extraInfo: {},
      pageSize: 10,
      pageNum: 1
    };
    this.rolePageAction(data);
    // 调用所有的角色列表
    this.roleTreeListAction({});
  },
  computed: {
    ...mapGetters(["rolePageResult", "roleModifyTree", "roleTreeListResult"])
  },
  methods: {
    ...mapActions("system", ["rolePageAction", "roleTreeListAction"]),

    // 打开modal框
    showInsurInformation() {
      console.log("传递到父组件了");
      this.dialog.dialogVisible = true;
    }
  }
};
</script>