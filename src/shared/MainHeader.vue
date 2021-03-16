<template>
  <div id="main-header">
    <router-link class="header__icon mobile--only" to="/friends">
      <AccountGroupIcon fillColor="#989898" :size="30" />
    </router-link>
    
    <router-link class="header__icon" to="/">
      <FireIcon fillColor="#fd5068" :size="40" />
    </router-link>

    <router-link class="header__icon mobile--only" to="/profile">
      <AccountIcon fillColor="#989898" :size="30" />
    </router-link>
  </div>
</template>

<script>
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";
import FireIcon from "vue-material-design-icons/Fire.vue";
import AccountIcon from "vue-material-design-icons/Account.vue";
export default {
  name: "main-header",
  components: {
    AccountGroupIcon,
    FireIcon,
    AccountIcon,
  },
};
</script>

<style scoped>
#main-header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  border-bottom: 1px solid #f5f0f0c2;
  padding: 2px;
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

@media only screen and (min-width: 768px) {
  .mobile--only {
    display: none;
  }
}
</style>