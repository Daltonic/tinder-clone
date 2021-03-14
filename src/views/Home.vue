<template>
  <div>
    <div class="content-wrapper">
      <div class="content">
        <MainHeader />
        <TinderCards :users="swipables" />
      </div>
    </div>
    <SideBar :matched="matched" :favorites="favorites" />
  </div>
</template>

<script>
import { auth } from "../firebase";
import { CometChat } from "@cometchat-pro/chat";
import MainHeader from "../shared/MainHeader";
import TinderCards from "../components/TinderCards";
import SideBar from "../shared/SideBar";
export default {
  name: 'home',
  data() {
    return {
      users: [],
      swipables: [],
      favorites: [],
      matched: []
    }
  },
  created() {
    this.getFavorites()
  },
  methods: {
    getFavorites() {
      const uid = auth.currentUser.uid;
      CometChat.getUser(uid)
        .then((user) => {
          const favorites = user.metadata?.favorites || []
          const requests = user.metadata?.requests || []

          let usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
          usersRequest
          .fetchNext()
          .then((users) => {
            this.users = [...users]
            this.swipables = [...users]
            this.favorites = users.filter(u => favorites.includes(u.uid)) 
            this.matched = users.filter(u => requests.includes(u.uid)) 
          })
          .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error));
    },
  },
  components: {
    MainHeader,
    TinderCards,
    SideBar,
  },
};
</script>
<style scoped>
html {
  background-color: #f9f9f9;
}

.wrapper {
  position: relative;
}

.content-wrapper {
  float: right;
  width: 100%;
}

.content {
  margin-left: 320px;
  clear: both;
  overflow: auto;
  background: #f9f9ff;
  min-height: 100vh;
}

@media only screen and (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>