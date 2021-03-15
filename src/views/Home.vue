<template>
  <div id="home">
    <div class="content-wrapper">
      <div class="content">
        <MainHeader />
        <TinderCards :users="swipables" />
      </div>
    </div>
    <SideBar />
  </div>
</template>

<script>
import { auth } from "../firebase";
import { CometChat } from "@cometchat-pro/chat";
import MainHeader from "../shared/MainHeader";
import TinderCards from "../components/TinderCards";
import SideBar from "../shared/SideBar";
export default {
  name: "home",
  data() {
    return {
      swipables: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      const uid = auth.currentUser.uid;
      CometChat.getUser(uid)
        .then(() => {
          let usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(30)
            .build();

          usersRequest
            .fetchNext()
            .then((users) => {
              this.swipables = users.filter(
                (u) => (u.id = Date.now() + (Math.random() * 100000).toFixed())
              );
            })
            .catch((error) => console.log(error));
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