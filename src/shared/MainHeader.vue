<template>
  <div id="main-header">
    <FireIcon fillColor="#fd5068" :size="40" class="header__icon" />
  </div>
</template>

<script>
import FireIcon from "vue-material-design-icons/Fire.vue";
export default {
  name: "main-header",
  components: {
    FireIcon,
  },
};
</script>

<style scoped>
#main-header {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-bottom: 1px solid #f9f9f9;
}
.header__icon {
  cursor: pointer;
  padding: 20px;
  border-radius: 15px;
  background: transparent;
}
.header__icon:hover {
  transform: scale(1.06);
  transition: all 0.2s ease-in-out;
}
</style>