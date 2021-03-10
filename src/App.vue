<template>
  <div id="app">
    <div class="wrapper">
      <div class="content-wrapper">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
      <div v-if="isLoggedIn" class="sidebar">
        <SideBar/>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import { auth } from "./firebase";
export default {
  name: 'app',
  data() {
    return {
      isLoggedIn: false,
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  components: {
    SideBar,
  }
}
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

html {
  background-color: #f9f9f9;
}

.wrapper {
  position: relative;
}

.content-wrapper {
  float: right;
  width: 100%;
}

.content {
  margin-left: 320px;
  clear: both;
  overflow: auto;
  background: #f9f9ff;
  min-height: 100vh;
}

.sidebar {
  position: relative;
  width: 320px;
  margin-right: -320px;
  float: right;
  overflow: hidden;
  background: #fff;
  color: #eee;
  min-height: 100vh;
}

@media only screen and (max-width: 768px) {
  .sidebar {
    display: none;
  }
  .content {
    margin-left: 0;
  }
}
</style>