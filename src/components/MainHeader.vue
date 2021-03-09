<template>
  <div id="main-header">
    <AccountIcon :size="40" class="header__icon"/>
    <FireIcon fillColor="#fd5068" :size="40" class="header__icon"/>
    <ForumIcon :size="40" class="header__icon"/>
  </div>
</template>

<script>
import ForumIcon from 'vue-material-design-icons/Forum.vue'
import AccountIcon from 'vue-material-design-icons/Account.vue'
import FireIcon from 'vue-material-design-icons/Fire.vue'
export default {
  name: "main-header",
  components: {
      ForumIcon,
      AccountIcon,
      FireIcon,
  }
};
</script>

<style scoped>
#main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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