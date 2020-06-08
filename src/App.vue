<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  // 这里是引用的取值store里面的state值
  computed: {
    //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
    ...mapState({
      isShow: state => state.footerStatus.showFooter,
      home: state => state.home
    }),
    ...mapGetters(["getToDo"])
  }
};
</script>
