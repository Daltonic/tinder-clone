<template>
  <div class="sidebar__messages">
    <h4 class="message__title">{{ title }}</h4>
    <router-link
      :to="'/chats/' + user.uid"
      v-for="user in users"
      :key="user.uid"
      :class="[uid == user.uid ? 'active' : '',  'sidebar__message']"
    >
      <div class="message__left">
        <CometChatAvatar :image="user.avatar" />
        <CometChatUserPresence :status="user.status" />
      </div>
      <div class="message__right">
        <h4 class="message__name">{{ user.name }}</h4>
        <p class="message__content">
          {{ user.metadata.rawMetadata || "Hello I'm using tinder!" }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import {
  CometChatAvatar,
  CometChatUserPresence,
} from "../cometchat-pro-vue-ui-kit";
export default {
  name: "messages",
  props: {
    title: { type: String, default: "Messages" },
    users: {
      type: [Object, Array],
      default: function () {
        return [
          {
            uid: "1",
            name: "Fullname",
            avatar:
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/newborn-baby-boy-sleeping-peacefully-wearing-knit-royalty-free-image-1589459736.jpg?crop=0.669xw:1.00xh;0.228xw,0&resize=640:*",
            metadata: { age: "21", rawMetadata: "Some Text Here!" },
          },
        ];
      },
    },
  },
  components: {
    CometChatAvatar,
    CometChatUserPresence,
  },
  computed: {
    uid() {
      return this.$route.params.uid;
    },
  },
};
</script>

<style scoped>
.sidebar__messages {
  padding: 20px 10px;
  height: calc(100vh - 300px);
  overflow-y: scroll;
}

.sidebar__messages a {
  color: black;
  text-decoration: none;
}

.sidebar__messages a:hover {
  background: #f9f9ff;
  transition: 0.5s;
}

.active {
  background: #ececff;
  transition: 0.5s;
}

.message__title {
  color: #fd5068;
  margin-bottom: 10px;
}

.sidebar__message {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.message__left {
  width: 70px;
  height: 70px;
}

.message__left img {
  object-fit: cover;
}

.message__right {
  margin-left: 10px;
}

.message__name {
  margin-bottom: 10px;
}
</style>