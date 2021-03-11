<template>
  <div id="app">
    <router-view></router-view>
    <SideBar />
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
export default {
  name: "app",
  components: {
    SideBar,
  },
};
</script>
<style>
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>