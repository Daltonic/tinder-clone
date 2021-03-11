<template>
  <div class="content-wrapper">
    <div class="content">
      <MainHeader />
      <TinderCards />
      <SwipeButtons />
    </div>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader";
import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons";
export default {
  components: {
    MainHeader,
    TinderCards,
    SwipeButtons,
  },
};
</script>
<style scoped>
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

@media only screen and (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>