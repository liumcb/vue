<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="16" class="headerlogo">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8" class="rightsection">
          <div class="grid-content bg-purple-light">
            <span class="el-dropdown-link userinfo-inner">欢迎您，登录名：{{ userInfo.username }}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <!-- 侧边栏导航  -->
        <!-- unique-opened只展开一个 -->
        <!-- router开启路由模式 -->
        <el-menu
          :unique-opened="true"
          :router="true"
          class="menu"
          background-color=" #3A3A3A"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="' ' + item1.id" v-for="item1 in menuList" :key="item1.url">
            <!--表示可以展开的一组 -->
            <template slot="title" @click="clickTitle">
              <!--图标 -->
              <i class="el-icon-location"></i>
              <!--文字 -->
              <span>{{ item1.name }}</span>
            </template>
            <el-menu-item
              class="menuItem"
              @click="clickMenuItem"
              v-for="item2 in item1.children"
              :key="item2.url"
              :index="item2.url"
            >
              <i class="el-icon-location"></i>
              <!--图标 -->
              <span>{{ item2.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!--首页信息 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      style: {
        display: "block"
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "menuList"])
  },
  created: function() {
    // 获取菜单
    const menuParam = { userId: 7 };
    this.createMenuAction(menuParam);
    // 获取代码表
    this.queryDictListAction({});
  },
  methods: {
    clickMenuItem() {},
    //回到首页
    clickTitle() {
      this.style.display = "block";
    },
    ...mapActions("home", ["createMenuAction", "queryDictListAction"])
  }
};
</script>
<style scoped>
.container {
  height: 100vh;
  font-size: 15px;
}
.header {
  background: #212121;
  color: #fff;
}
.aside {
  background: #3a3a3a;
  color: #fff;
  /* height: 100%; */
}
.menu {
  background: none;
  color: #fff;
}
.main {
  /* height: 100%; */
  color: #212121;
}
.headerlogo {
  line-height: 60px;
  margin-top: 10px;
}
.rightsection {
  line-height: 60px;
  text-align: center;
}
</style>
