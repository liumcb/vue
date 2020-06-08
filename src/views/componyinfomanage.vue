<template>
  <div>
    <p></p>
  </div>
</template>

<style>
</style>

<script>
export default {
  data() {
    console.log("this.$store.home=", this.$store.state.home);
    console.log("this.getToDo", this.getToDo);

    return {
      views: this.$store.state.home.views
    };
  },
  created() {}
};
</script>