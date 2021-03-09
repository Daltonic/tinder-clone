<template>
  <div id="app">
    <MainHeader/>
    <TinderCard/>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import TinderCard from './components/TinderCard'
export default {
  name: 'app',
  components: {
    MainHeader,
    TinderCard,
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
</style>