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
            <h3>{{ user.name }}, {{ user.metadata.age }}</h3>
          </div>
        </div>
      </vue-swing>

      <div class="swipe__icons">
        <CloseIcon
          :size="30"
          fillColor="#ec5e6f"
          class="swipe__icon swipe__icon__close"
        />
        <StarIcon
          :size="30"
          fillColor="#62b4f9"
          class="swipe__icon swipe__icon__star"
        />
        <HeartIcon
          :size="30"
          fillColor="#76e2b3"
          class="swipe__icon swipe__icon__heart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSwing from "vue-swing";
import CloseIcon from "vue-material-design-icons/Close.vue";
import StarIcon from "vue-material-design-icons/Star.vue";
import HeartIcon from "vue-material-design-icons/Heart.vue";
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
  },
  data() {
    return {
      people: [
        {
          email: "bird_alex@outlook.com",
          gender: "male",
          id: "flying-voice",
          name: "Nedra Marvin",
          url:
            "https://cdn.mos.cms.futurecdn.net/psewhVdSoB8HyGXfqaz7rb-320-80.jpg",
        },
        {
          email: "ratione_ebba@gmail.com",
          gender: "female",
          id: "doc.shadow",
          name: "Layne Dickens",
          url: "https://s.hs-data.com/bilder/spieler/gross/128447.jpg",
        },
        {
          email: "rail@hotmail.com",
          gender: "male",
          id: "lady.violet",
          name: "Marian Kling",
          url:
            "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
        },
        {
          email: "darby@yahoo.com",
          gender: "female",
          id: "hungry.leaf.20",
          name: "Hudson Stehr",
          url:
            "https://upload.wikimedia.org/wikipedia/commons/d/d9/Lionel_Messi_20180626_%28cropped%29.jpg",
        },
        {
          email: "when@outlook.com",
          gender: "female",
          id: "mysterious-dust",
          name: "Mercedes Veum",
          url:
            "https://resources.premierleague.com/premierleague/photos/players/250x250/p42786.png",
        },
        {
          email: "einar@yahoo.com",
          gender: "male",
          id: "doc.meadow",
          name: "Elenora Blick",
          url: "https://gossipgist.com/uploads/27177/pedro-sportnet.jpg",
        },
      ],
      config: {
        allowedDirections: [VueSwing.Direction.LEFT, VueSwing.Direction.RIGHT],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300,
      },
    };
  },
  components: {
    VueSwing,
    CloseIcon,
    StarIcon,
    HeartIcon,
  },
  methods: {
    swipped(user) {
      const index = this.users.findIndex((u) => u.uid == user.uid);
      this.users.splice(index, 1);
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
</style>