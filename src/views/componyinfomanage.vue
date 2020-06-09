<template>
  <div>
    <h1>{{title}}</h1>
    <div v-on:click="clickCount">点击一下</div>
    <h1>此时的count：{{count}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$store.state.home.title,
      count: this.$store.state.home.count
    };
  },
  methods: {
    clickCount() {
      // 先注册，在调用
      this.add();
    }
  }
};
</script>