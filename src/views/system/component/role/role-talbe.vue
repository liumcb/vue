<template>
  <div>
    <el-table :data="rolePageResult && rolePageResult.value" border>
      <el-table-column
        v-for="item in columns"
        v-bind:label="item.text"
        v-bind:key="item.id"
        :prop="item.prop"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.column.property === 'parentId'"
          >{{ scope.row.parentId == 0 ? '顶级' : getName(scope.row[scope.column.property])}}</span>
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="50%">
        <template slot-scope="scope">
          <el-popconfirm
            okText="是"
            title="是否删除？"
            @onConfirm="deleteHandle(rolePageResult && rolePageResult.value[scope.$index])"
          >
            <el-button type="text" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
          <el-button
            @click.native.prevent="modifyViewHandle(rolePageResult && rolePageResult.value[scope.$index],'modify')"
            type="text"
            size="small"
          >修改</el-button>
          <el-button
            @click.native.prevent="modifyViewHandle(rolePageResult && rolePageResult.value[scope.$index],'view')"
            type="text"
            size="small"
          >查看</el-button>
          <el-button
            @click.native.prevent="userConfig(rolePageResult && rolePageResult.value[scope.$index])"
            type="text"
            size="small"
          >用户配置</el-button>
          <el-button
            @click.native.prevent="modifyViewHandle(rolePageResult && rolePageResult.value[scope.$index],'view')"
            type="text"
            size="small"
          >菜单配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      align="center"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="role.currentPage"
      :page-sizes="[10,20,30]"
      :page-size="role.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rolePageResult &&  rolePageResult.totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["role", "dialog", "transfer"],
  data() {
    return {
      columns: [
        { text: "角色名称", prop: "roleName", width: "25%" },
        { text: "上级角色", prop: "parentId", width: "25%" }
      ],
      token: this.CommonFunction.token
    };
  },
  computed: {
    ...mapGetters(["rolePageResult", "roleTreeListResult"])
  },
  methods: {
    ...mapActions("system", [
      "rolePageAction",
      "deleteRoleAction",
      "allUserAction",
      "selectUserAction"
    ]),

    getName: function(parentId) {
      return this.CommonFunction.getNameByCode(
        parentId,
        this.roleTreeListResult,
        "id",
        "name"
      );
    },
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
          this.rolePageAction(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 翻页size
    handleSizeChange: function(size) {
      this.pagesize = size;
      const data = {
        param: {},
        extraInfo: {
          roleNameLike: this.role.form.roleNameLike
        },
        pageSize: size,
        pageNum: this.role.currentPage || 1
      };
      console.log("翻页size===", data);
      this.rolePageAction(data);
    },
    // 翻页page
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      const data = {
        param: {},
        extraInfo: {
          roleNameLike: this.role.form.roleNameLike
        },
        pageSize: this.role.pagesize || 10,
        pageNum: currentPage
      };
      console.log("翻页===", data);
      this.rolePageAction(data);
    },
    // 删除
    deleteHandle(record) {
      console.log("删除record===", record);
      const data = {
        id: record.id
      };
      const searchParams = {
        param: {},
        extraInfo: {
          roleNameLike: this.role.form.roleNameLike
        },
        pageSize: this.role.pagesize || 10,
        pageNum: this.role.currentPage || 1
      };
      const result = {
        data,
        searchParams
      };
      this.deleteRoleAction(result);
    },
    // 修改-查看
    modifyViewHandle(record, type) {
      console.log("record====", record);
      this.dialog.dialogVisible = true;
      this.dialog.dialogType = "dialog";
      this.dialog.title =
        (type === "modify" && "修改角色") || (type === "view" && "查看角色");
      this.dialog.disable = type === "view";
      const form = {
        roleName: record.roleName,
        parentId: (record.parentId === 0 && [record.parentId]) ||
          (record.parentId === 1 && [0, record.parentId]) || [
            0,
            1,
            record.parentId
          ]
      };
      console.log("form=", form);
      this.dialog.dialogForm = form;
    },
    // 用户配置
    userConfig(record) {
      this.dialog.dialogVisible = true;
      this.dialog.dialogType = "userConfig";
      console.log("record===用户配置", record);
      // 获取所有用户
      this.allUserAction({});
      // 获取已选用户
      this.selectUserAction({
        roleId: record.id
      });
    }
  }
};
</script>