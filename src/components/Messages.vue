<template>
  <div class="sidebar__messages">
    <h4 class="message__title">{{title}}</h4>
    <div v-for="user in users" :key="user.uid" class="sidebar__message">
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
    </div>
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
    title: {type: String, default: "Messages"},
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
};
</script>

<style scoped>
.sidebar__messages {
  padding: 20px 10px;
  height: 400px;
  overflow-y: scroll;
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