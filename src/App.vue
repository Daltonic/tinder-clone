<template>
  <div id="app">
    <MainHeader/>
    <TinderCards/>
    <SwipeButtons/>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import TinderCards from './components/TinderCards'
import SwipeButtons from './components/SwipeButtons'
export default {
  name: 'app',
  components: {
    MainHeader,
    TinderCards,
    SwipeButtons,
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
</style>