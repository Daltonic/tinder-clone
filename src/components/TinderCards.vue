<template>
  <div class="tinder__card">
    <div class="tinder__card__container">
      <vue-swing
        v-for="user in users"
        :key="user.id"
        @throwout="swipped(user)"
        :config="config"
        class="swipe"
      >
        <div
          class="card"
          :style="{ 'background-image': `url(${user.avatar})` }"
        >
          <div class="card__content">
            <h3>{{ user.name }}</h3>
          </div>
        </div>
      </vue-swing>

      <div class="swipe__icons">
        <CloseIcon
          :size="30"
          fillColor="#ec5e6f"
          class="swipe__icon swipe__icon__close"
          @click="reject()"
        />
        <StarIcon
          :size="30"
          fillColor="#62b4f9"
          class="swipe__icon swipe__icon__star"
          @click="onFavorite()"
          v-if="favored"
        />
        <StarOutlineIcon
          :size="30"
          fillColor="#62b4f9"
          class="swipe__icon swipe__icon__star"
          @click="onFavorite()"
          v-else
        />
        <HeartIcon
          :size="30"
          fillColor="#76e2b3"
          class="swipe__icon swipe__icon__heart"
          @click="onRequest()"
          v-if="requested"
        />
        <HeartOutlineIcon
          :size="30"
          fillColor="#76e2b3"
          class="swipe__icon swipe__icon__heart"
          @click="onRequest()"
          v-else
        />
        <PowerIcon
          :size="30"
          fillColor="#ec5e6f"
          class="swipe__icon swipe__icon__power"
          @click="logOut()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { CometChat } from "@cometchat-pro/chat";
import VueSwing from "vue-swing";
import CloseIcon from "vue-material-design-icons/Close.vue";
import PowerIcon from "vue-material-design-icons/Power.vue";
import StarIcon from "vue-material-design-icons/Star.vue";
import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";
import HeartIcon from "vue-material-design-icons/Heart.vue";
import HeartOutlineIcon from "vue-material-design-icons/HeartOutline.vue";
export default {
  name: "tinder-cards",
  props: {
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
    uid: {
      type: String
    }
  },
  data() {
    return {
      config: {
        allowedDirections: [VueSwing.Direction.LEFT, VueSwing.Direction.RIGHT],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300,
      },
      favorites: [],
      requests: [],
    };
  },
  created() {
    this.getUser();
  },
  components: {
    VueSwing,
    CloseIcon,
    PowerIcon,
    StarIcon,
    StarOutlineIcon,
    HeartIcon,
    HeartOutlineIcon,
  },
  methods: {
    logOut() {
      auth
        .signOut()
        .catch((error) => console.log(error.message))
        .finally(() => this.$router.push({ name: "login" }));
    },
    reject() {
      this.swipped(this.currentCard);
    },
    swipped(user) {
      const index = this.users.findIndex((u) => u.uid == user.uid);
      this.users.splice(index, 1);
      user.id = Date.now() + (Math.random() * 100000).toFixed();
      this.users.unshift({ ...user });
    },
    getUser() {
      CometChat.getUser(this.uid)
        .then((user) => {
          this.favorites = user.metadata?.favorites || [];
          this.requests = user.metadata?.requests || [];
        })
        .catch((error) => console.log(error));
    },
    onRequest() {
      const data = { ...this.currentCard };
      const apiKey = process.env.VUE_APP_KEY;

      if (!this.requests.includes(data.uid)) {
        this.requests.push(data.uid);
      } else {
        const index = this.requests.findIndex((f) => f == data.uid);
        this.requests.splice(index, 1);
      }

      const user = new CometChat.User(this.uid);
      user.setMetadata({
        ...data.metadata,
        favorites: this.favorites,
        requests: this.requests,
      });

      CometChat.updateUser(user, apiKey)
        .then(() => console.log(user))
        .catch((error) => console.log(error));
    },
    onFavorite() {
      const data = { ...this.currentCard };
      const apiKey = process.env.VUE_APP_KEY;

      if (!this.favorites.includes(data.uid)) {
        this.favorites.push(data.uid);
      } else {
        const index = this.favorites.findIndex((f) => f == data.uid);
        this.favorites.splice(index, 1);
      }

      const user = new CometChat.User(this.uid);
      user.setMetadata({
        ...data.metadata,
        favorites: this.favorites,
        requests: this.requests,
      });

      CometChat.updateUser(user, apiKey)
        .then(() => console.log(user))
        .catch((error) => console.log(error));
    },
  },
  computed: {
    currentCard() {
      return this.users[this.users.length - 1];
    },
    favored() {
      return this.favorites.includes(this.currentCard?.uid || 99999);
    },
    requested() {
      return this.requests.includes(this.currentCard?.uid || 99999);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  background-color: #fff;
  width: 250px;
  padding: 20px;
  max-width: 85vw;
  height: 50vh;
  border-radius: 9px;
  background-size: cover;
  background-position: center;
}

.tinder__card__container {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}

.swipe {
  position: absolute;
}

.card__content {
  width: 100%;
  height: 100%;
}

.card h3 {
  position: absolute;
  bottom: 0;
  margin: 10px;
  color: #fff;
  background: linear-gradient(
    109deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 9px;
  padding: 5px;
}

.swipe__icons__container {
  display: flex;
  justify-content: center;
}

.swipe__icons {
  position: fixed;
  bottom: 5vh;
  display: flex;
  width: 250px;
  justify-content: space-evenly;
}

.swipe__icon__close:hover,
.swipe__icon__star:hover,
.swipe__icon__heart:hover {
  transform: scale(1.06);
  transition: all 0.2s ease-in-out;
}

.swipe__icons .material-design-icon__svg {
  background-color: white;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2) !important;
  border-radius: 30px;
  padding: 10px;
}

@media only screen and (min-width: 768px) {
  .swipe__icon__power {
    display: none;
  }
}
</style>