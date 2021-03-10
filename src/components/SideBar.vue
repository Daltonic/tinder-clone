<template>
  <div class="sidebar__wrapper">
    <CometChatUserListWithMessages />
  </div>
</template>

<script>
import { CometChatUserListWithMessages } from "../cometchat-pro-vue-ui-kit";
export default {
  components: {
    CometChatUserListWithMessages,
  },
};
</script>

<style scoped>
.sidebar__header {
  background: linear-gradient(
    90deg,
    rgba(233, 12, 119, 1) 0%,
    rgba(241, 96, 89, 1) 100%
  );
  padding: 20px;
}
</style>