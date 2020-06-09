<template>
  <div>
    <h1>{{ title }}</h1>
    <div @click="incrementClick">点击一下</div>
    <h1>{{ count }}====={{ ashop }}</h1>
    <div v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {
    ...mapState('home', {
      title: (state) => state.title,
      count: (state) => state.count,
    }),
    ...mapGetters(['ashop', 'todos']),
  },
  methods: {
    incrementClick: function() {
      this.incrementAction();
    },
    ...mapActions('home', ['incrementAction']),
  },
};
</script>
