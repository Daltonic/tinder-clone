<template>
  <div>
    <div class="content-wrapper">
      <div class="content">
        <MainHeader />
        <TinderCards :users="users" />
      </div>
    </div>
    <SideBar :users="users" />
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import MainHeader from "../components/MainHeader";
import TinderCards from "../components/TinderCards";
import SideBar from "../components/SideBar";
export default {
  name: 'home',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      let usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();

      usersRequest.fetchNext().then(
        userList => this.users = userList,
        error => console.log("User list fetching failed with error:", error)
      );
    }
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