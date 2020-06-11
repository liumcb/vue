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
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteHandle(scope.$index, menuPageResult && menuPageResult.value)"
            type="text"
            size="mini"
          >删除</el-button>
          <el-button
            @click.native.prevent="modifyHandle(scope.$index, menuPageResult && menuPageResult.value)"
            type="text"
            size="small"
          >修改</el-button>
          <el-button
            @click.native.prevent="viewHandle(scope.$index, menuPageResult && menuPageResult.value)"
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="55%" center>
      <el-form :model="dialogForm" ref="dialogForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称">
              <el-input v-model="dialogForm.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址">
              <el-input v-model="dialogForm.url" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单编号">
              <el-input v-model="dialogForm.menuCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input v-model="dialogForm.sort" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级编号">
              <el-input v-model="dialogForm.parentMenuCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为菜单">
              <el-input v-model="dialogForm.isMenu" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
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
      dialogForm: {
        menuName: "",
        menuCode: "",
        parentMenuCode: "",
        url: "",
        sort: "",
        isMenu: ""
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
      /*分页数据*/
      currentPage: 1, // 当前页码
      total: "", // 总条数
      pageSize: 10, // 每页的数据条数
      centerDialogVisible: false // modal框
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
  },
  computed: {
    ...mapGetters(["menuPageResult"])
  },
  methods: {
    ...mapActions("system", ["getMenuPageAction"]),
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
          console.log("valid=====", valid);
          console.log(this.form);
          this.centerDialogVisible = true;
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

    // 新增菜单
    dialogFormSubmit(dialogForm) {
      this.$refs[dialogForm].validate(valid => {
        if (valid) {
          console.log("valid=====", valid);
          console.log("新增菜单==", this.dialogForm);
          const data = {
            menuCode: this.dialogForm.menuCode,
            menuName: this.dialogForm.menuName,
            url: this.dialogForm.url,
            isMenu: this.dialogForm.isMenu,
            parentMenuCode: this.dialogForm.parentMenuCode,
            sort: this.dialogForm.sort,
            status: this.dialogForm.status
          };
          console.log("data=", data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
