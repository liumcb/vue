<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="菜单名称">
            <el-input v-model="form.menuNameLike"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="search('form')">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="add('form')">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="menuPageResult && menuPageResult.value" border>
      <el-table-column
        v-for="item in columns"
        v-bind:label="item.text"
        v-bind:key="item.id"
        :prop="item.prop"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="scope.column.property === 'isMenu'">{{ scope.row.isMenu == 1 ? '是' : '否'}}</span>
          <span
            v-else-if="scope.column.property === 'status'"
          >{{ scope.row.status === 1 ? '启用' : '不启用'}}</span>
          <span
            v-else-if="scope.column.property === 'parentMenuCode'"
          >{{ scope.row.parentMenuCode == 0 ? '顶级' : scope.row[scope.column.property]}}</span>
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-popconfirm
            okText="是"
            title="是否删除？"
            @onConfirm="deleteHandle(menuPageResult && menuPageResult.value[scope.$index])"
          >
            <el-button type="text" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
          <el-button
            @click.native.prevent="modifyViewHandle(menuPageResult && menuPageResult.value[scope.$index],'modify')"
            type="text"
            size="small"
          >修改</el-button>
          <el-button
            @click.native.prevent="modifyViewHandle(menuPageResult && menuPageResult.value[scope.$index],'view')"
            type="text"
            size="small"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      align="center"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="menuPageResult &&  menuPageResult.totalCount"
    ></el-pagination>
    <!-- modal框 -->
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="55%"
      center
      :close-on-click-modal="false"
      :before-close="closeExpertFormDialog"
    >
      <el-form :model="dialogForm" ref="dialogForm" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="dialogForm.menuName" :disabled="disable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址" prop="url">
              <el-input v-model="dialogForm.url" autocomplete="off" :disabled="disable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单编号" prop="menuCode">
              <el-input v-model="dialogForm.menuCode" autocomplete="off" :disabled="disable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="dialogForm.sort" autocomplete="off" :disabled="disable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级编号" prop="parentMenuCode">
              <el-cascader
                :options="treeSelectListResult"
                :props="{ multiple: true, checkStrictly: true }"
                clearable
                v-model="dialogForm.parentMenuCode"
                :disabled="disable"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为菜单" prop="isMenu">
              <el-select v-model="dialogForm.isMenu" placeholder="请选择" :disabled="disable">
                <el-option
                  v-for="item in menuOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="!disable">
        <el-button @click="cancelHandle('dialogForm')">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit('dialogForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        menuNameLike: ""
      },
      disable: false,
      type: "add",
      dialogForm: {
        menuName: "",
        menuCode: "",
        parentMenuCode: ["0"],
        url: "",
        sort: "",
        isMenu: ""
      },
      // 必填校验
      rules: {
        menuName: {
          required: true,
          message: "请输入菜单名称",
          trigger: "blur"
        },
        menuCode: {
          required: true,
          message: "请输入菜单编号",
          trigger: "blur"
        },
        parentMenuCode: {
          required: true,
          message: "请输入父级编号",
          trigger: "blur"
        },
        url: { required: true, message: "请输入请求地址", trigger: "blur" },
        sort: { required: true, message: "请输入排序", trigger: "blur" },
        isMenu: { required: true, message: "请输入是否菜单", trigger: "blur" }
      },
      columns: [
        { text: "菜单名称", prop: "menuName", width: 150 },
        { text: "菜单编号", prop: "menuCode", width: 180 },
        { text: "菜单父编号", prop: "parentMenuCode", width: 150 },
        { text: "请求地址", prop: "url", width: 220 },
        { text: "排序", prop: "sort", width: 100 },
        { text: "层级", prop: "level", width: 100 },
        { text: "是否是菜单", prop: "isMenu", width: 100 },
        { text: "状态", prop: "status", width: 100 }
      ],
      menuOptions: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      /*分页数据*/
      currentPage: 1, // 当前页码
      total: "", // 总条数
      pageSize: 10, // 每页的数据条数
      centerDialogVisible: false, // modal框
      title: "添加菜单",
      recordInfo: {}
    };
  },
  created() {
    // 进来调用菜单页面
    const data = {
      param: {},
      extraInfo: {},
      pageSize: 10,
      pageNum: 1
    };
    this.getMenuPageAction(data);
    // 获取tree
    this.quaryTreeAction({});
  },
  computed: {
    ...mapGetters([
      "menuPageResult",
      "menuCreateResult",
      "treeSelectListResult",
      "menuFindListResult"
    ])
  },
  methods: {
    ...mapActions("system", [
      "getMenuPageAction",
      "menuCreateAction",
      "menuDeleteAction",
      "quaryTreeAction",
      "menuModifyAction",
      "queryMenuListAction"
    ]),
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
              menuNameLike: this.form.menuNameLike
            },
            pageSize: this.pageSize,
            pageNum: this.currentPage
          };
          console.log("data====", data);
          this.getMenuPageAction(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    add(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 打开dialog框
          this.centerDialogVisible = true;
          // 保存record信息
          this.recordInfo = {};
          this.title = "添加菜单";
          this.type = "add";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 翻页size
    handleSizeChange: function(size) {
      console.log("size=", size, this.currentPage);
      this.pagesize = size;
      const data = {
        param: {},
        extraInfo: {
          menuNameLike: this.form.menuNameLike
        },
        pageSize: size,
        pageNum: this.currentPage || 1
      };
      console.log("翻页size===", data);
      this.getMenuPageAction(data);
    },
    // 翻页page
    handleCurrentChange: function(currentPage) {
      console.log("currentPage===", currentPage, this.pagesize);
      this.currentPage = currentPage;
      const data = {
        param: {},
        extraInfo: {
          menuNameLike: this.form.menuNameLike
        },
        pageSize: this.pagesize || 10,
        pageNum: currentPage
      };
      console.log("翻页===", data);
      this.getMenuPageAction(data);
    },

    //关闭dialog前
    closeExpertFormDialog(done) {
      this.$refs["dialogForm"].resetFields();
      done(); //done 用于关闭 Dialog
    },

    // 新增菜单
    dialogFormSubmit(dialogForm) {
      this.$refs[dialogForm].validate(valid => {
        if (valid) {
          console.log("新增菜单==", this.dialogForm);
          console.log("保存的record信息===", this.recordInfo);
          const parentMenuCode = JSON.parse(
            JSON.stringify(this.dialogForm.parentMenuCode)
          );
          console.log("parentMenuCode-=====", parentMenuCode);
          const data = {
            menuCode: this.dialogForm.menuCode,
            menuName: this.dialogForm.menuName,
            url: this.dialogForm.url,
            isMenu: this.dialogForm.isMenu,
            parentMenuCode: parentMenuCode.pop().pop(),
            sort: this.dialogForm.sort,
            status: this.dialogForm.status,

            level: this.recordInfo.level,
            id: this.recordInfo.id
          };
          console.log("data=", data);
          const searchParam = {
            param: {},
            extraInfo: {
              menuNameLike: this.form.menuNameLike
            },
            pageSize: this.pageSize,
            pageNum: this.currentPage
          };
          const result = {
            data,
            searchParam
          };
          if (this.type === "add") {
            this.menuCreateAction(result);
          } else {
            this.menuModifyAction(result);
          }

          const timer = setInterval(() => {
            if (
              this.menuCreateResult &&
              this.menuCreateResult.success === true
            ) {
              clearInterval(timer);
              this.centerDialogVisible = false; //关闭对话框
            }
          }, 10);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消
    cancelHandle(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false; //关闭对话框
    },
    // 删除菜单
    deleteHandle(record) {
      console.log("删除record===", record);
      const params = {
        data: {
          id: record && record.id
        },
        searchParam: {
          param: {},
          extraInfo: {
            menuNameLike: this.form.menuNameLike
          },
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
      };
      this.menuDeleteAction(params);
    },
    // 修改菜单
    modifyViewHandle(record, type) {
      console.log("record=====", record);
      this.type = type;
      this.recordInfo = record;
      this.centerDialogVisible = true; // 打开modal

      this.disable = type === "view";
      this.title =
        (type === "view" && "查看菜单") || (type === "modify" && "修改菜单");
      // 获取父级编号列表
      this.queryMenuListAction({
        menu_code: record.parentMenuCode
      });
      const timer = setInterval(() => {
        console.log("this.menuFindListResult", this.menuFindListResult);
        if (
          this.menuFindListResult &&
          this.menuFindListResult.success === true
        ) {
          clearInterval(timer);
          const menuFindList = JSON.parse(
            JSON.stringify(
              this.menuFindListResult && this.menuFindListResult.value
            )
          );
          console.log("menuFindList=", menuFindList);
          const parentMenuCode =
            menuFindList && menuFindList.length > 0 && menuFindList[0].id;
          console.log("parentMenuCode===parentMenuCode", parentMenuCode);
          this.dialogForm = {
            parentMenuCode: parentMenuCode ? [parentMenuCode] : ["0"],
            menuName: record.menuName,
            menuCode: record.menuCode,
            url: record.url,
            sort: record.sort,
            isMenu: record.isMenu
          }; // 添加默认值
          console.log("this.dialogForm=", this.dialogForm);
        }
      }, 10);
    }
  }
};
</script>
