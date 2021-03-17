<template>
  <CometChatUserListWithMessages :key="id" />
</template>

<script>
import { CometChatUserListWithMessages } from "../cometchat-pro-vue-ui-kit";
export default {
  name: "friends",
  data() {
    return {
      id: Date.now() + (Math.random() * 100000).toFixed()
    }
  },
  components: {
    CometChatUserListWithMessages,
  },
};
</script>

<style scope>
html {
  background-color: #ffffff;
}
</style>