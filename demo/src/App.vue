<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    clearToken() {
      localStorage.clear("token")
    },
    goLogin() {
      this.$router.push("/");
    }
  }
}
</script>
<style>
  #app {
    height: 100%;
  }
</style>
