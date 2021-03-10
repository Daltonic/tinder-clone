<template>
  <div>
    <MainHeader />
    <TinderCards />
    <SwipeButtons />
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
</style>