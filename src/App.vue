<template>
  <div id="app">
    <router-view></router-view>
    <FooterBar v-if="isShow" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterBar from "./components/footerBar";

export default {
  name: "App",
  components: {
    FooterBar: FooterBar
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    })
  },
  watch: {
    $route(to, from) {
      console.log("to===", to, "from====", from);
      if (to.name === "Index") {
        this.$store.dispatch("footerStatus/showFooter");
      } else {
        this.$store.dispatch("footerStatus/hideFooter");
      }
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
