<template>
  <div v-if="isLoggedIn" class="sidebar">
    <div class="sidebar__header">
      <div class="header__left">
        <div class="sidebar__avatar">
          <CometChatAvatar :image="avatar" />
        </div>
        <router-link to="/profile">My Profile</router-link>
      </div>
      <div class="header__right">
        <AccountSearchIcon
          class="header__icon"
          @click="search = !search"
          :size="30"
          fillColor="#ffffff"
        />
      </div>
    </div>
    <div v-if="search" class="sidebar__search">
      <input class="search__input" type="search" placeholder="Search" />
    </div>
    <div class="sidebar__discover">
      <div class="discover__left">
        <div class="card__circle">
          <CardsIcon fillColor="#fd5068" :size="40" />
        </div>
      </div>
      <div class="discover__right">
        <h4>Discover New Matches</h4>
        <p>Start swipping to connect with new people!</p>
      </div>
    </div>
    <div class="sidebar__messages">
      <h4 class="message__title">Messages</h4>
      <div v-for="user in users" :key="user.uid" class="sidebar__message">
        <div class="message__left">
          <CometChatAvatar :image="user.avatar || nameToImage(user.name)" />
          <CometChatUserPresence :status="user.status" />
        </div>
        <div class="message__right">
          <h4 class="message__name">{{user.name}}</h4>
          <p class="message__content">Some message</p>
        </div>
      </div>
    </div>
    <button class="logout__btn" @click="logOut" type="submit">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Logout
    </button>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import {
  CometChatAvatar,
  CometChatUserPresence,
} from "../cometchat-pro-vue-ui-kit";
import AccountSearchIcon from "vue-material-design-icons/AccountSearch.vue";
import CardsIcon from "vue-material-design-icons/Cards.vue";
import { auth } from "../firebase";
export default {
  data() {
    return {
      isLoggedIn: false,
      search: false,
      users: [],
      avatar: ""
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.avatar = user.photoURL
        this.getUsers()
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    logOut() {
      auth
        .signOut()
        .then(() => (this.isLoggedIn = false))
        .catch((error) => console.log(error.message))
        .finally(() => this.$router.push({ name: "login" }));
    },
    getUsers() {
      let limit = 30;
      let usersRequest = new CometChat.UsersRequestBuilder().setLimit(limit).build();

      usersRequest.fetchNext().then(
        userList => this.users = userList,
        error => console.log("User list fetching failed with error:", error)
      );
    },
    nameToImage(name) {
      let initials = name.match(/\b(\w)/g)[0];
      let randomColor = '#' + (0x1000000|(Math.random()*0xFFFFFF)).toString(16).substr(1,6);

      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = canvas.height = 100;

      context.fillStyle = randomColor;
      context.beginPath();
      context.ellipse(
        canvas.width/2, canvas.height/2,
        canvas.width/2, canvas.height/2,
        0, 0, Math.PI * 2
      );
      context.fill();

      context.font = (canvas.height/3) + "px serif";
      context.fillStyle = "#fff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(initials, canvas.width/2, canvas.height/2);
          
      return canvas.toDataURL();
    }
  },
  components: {
    CometChatAvatar,
    CometChatUserPresence,
    AccountSearchIcon,
    CardsIcon,
  },
};
</script>

<style>
.sidebar {
  position: relative;
  width: 320px;
  margin-right: -320px;
  float: right;
  overflow: hidden;
  background: #fff;
  min-height: 100vh;
}

.sidebar__header {
  background: rgb(233, 12, 119);
  background: linear-gradient(
    90deg,
    rgba(233, 12, 119, 1) 0%,
    rgba(241, 96, 89, 1) 100%
  );
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.sidebar__avatar {
  width: 40px;
  height: 40px;
}

.sidebar__avatar img {
  object-fit: cover;
}

.sidebar__discover {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ececff;
}

.discover__right p {
  font-size: 11px;
}

.card__circle {
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #fd5068;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__left {
  display: flex;
  align-items: center;
}

.header__icon {
  cursor: pointer;
  padding: 20px;
  border-radius: 15px;
  background: transparent;
  transition: all 0.2s ease-in-out;
}
.header__icon:hover {
  transform: scale(1.06);
}

.sidebar__header a {
  margin-left: 10px;
  color: #fff;
  text-decoration: none;
}

.sidebar__avatar {
  width: 40px;
}

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

.logout__btn {
  position: fixed;
  width: 320px;
  bottom: 0;
  display: inline-block;
  padding: 10px 20px;
  color: #e90d77;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  background: white;
  border: none;
}

.logout__btn:hover {
  background: #e90d77;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #e90d77, 0 0 25px #e90d77, 0 0 50px #e90d77,
    0 0 100px #e90d77;
}

.logout__btn span {
  position: absolute;
  display: block;
}

.logout__btn span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e90d77);
  animation: btn-anim1 1s linear infinite;
}

.logout__btn span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #e90d77);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

.logout__btn span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #e90d77);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

.logout__btn span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #e90d77);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

.search__input {
  display: block;
  width: 100%;
  border: 0px;
  box-shadow: rgb(20 20 20 / 4%) 0px 0px 0px 1px inset;
  padding: 6px 8px 6px 35px;
  font-size: 15px;
  outline: none;
  color: rgb(20, 20, 20);
  background: url("/img/search-grey-icon.ee1802c6.svg") 10px center no-repeat
    rgba(20, 20, 20, 0.04);
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

@media only screen and (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>