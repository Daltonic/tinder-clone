<template>
  <div v-if="isLoggedIn" class="sidebar">
    <div class="sidebar__header">
      <div class="header__left">
        <div class="sidebar__avatar">
          <CometChatAvatar :image="avatar" />
        </div>
        <router-link to="/profile" :title="name">My Profile</router-link>
      </div>
      <div class="header__right">
        <AccountArrowRightIcon
          v-if="!seeFav"
          class="header__icon"
          :size="30"
          fillColor="#ffffff"
          @click="seeFav = !seeFav"
        />
        <AccountArrowLeftIcon
          v-else
          class="header__icon"
          :size="30"
          fillColor="#ffffff"
          @click="seeFav = !seeFav"
        />
      </div>
    </div>
    <div class="sidebar__search">
      <input class="search__input" type="search" placeholder="Search" />
    </div>
    <div class="sidebar__discover">
      <div class="discover__left">
        <div class="card__circle">
          <router-link to="/">
            <CardsIcon fillColor="#fd5068" :size="40" />
          </router-link>
        </div>
      </div>
      <div class="discover__right">
        <h4>Discover New Matches</h4>
        <p>Start swipping to connect with new people!</p>
      </div>
    </div>

    <Messages v-if="!seeFav" :users="matched" title="Matched" />
    <Messages v-else :users="favorites" title="Favorites" />

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
import { CometChatAvatar } from "../cometchat-pro-vue-ui-kit";
import Messages from "../components/Messages";
import AccountArrowLeftIcon from "vue-material-design-icons/AccountArrowLeft.vue";
import AccountArrowRightIcon from "vue-material-design-icons/AccountArrowRight.vue";
import CardsIcon from "vue-material-design-icons/Cards.vue";
import { auth } from "../firebase";
export default {
  name: "sidebar",
  data() {
    return {
      isLoggedIn: false,
      avatar: "",
      name: "",
      seeFav: false,
      matched: [],
      favorites: []
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.avatar = user.photoURL;
        this.name = user.displayName;
        this.getUser()
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    getUser() {
      const uid = auth.currentUser.uid;
      CometChat.getUser(uid)
        .then((user) => {
          const favorites = user.metadata?.favorites || []
          const requests = user.metadata?.requests || []

          let usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
          usersRequest
          .fetchNext()
          .then((users) => {
            this.favorites = users.filter(u => favorites.includes(u.uid)) 
            this.matched = users.filter(u => requests.includes(u.uid)) 
          })
          .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error));
    },
    logOut() {
      auth
        .signOut()
        .then(() => (this.isLoggedIn = false))
        .catch((error) => console.log(error.message))
        .finally(() => this.$router.push({ name: "login" }));
    },
  },
  components: {
    Messages,
    CometChatAvatar,
    AccountArrowLeftIcon,
    CardsIcon,
    AccountArrowRightIcon,
  },
};
</script>

<style>
.sidebar {
  position: absolute;
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