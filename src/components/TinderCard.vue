<template>
  <div class="tinder__card">
    <div class="tinder__card__container">
      <vue-swing
        v-for="person in people"
        :key="person.id"
        @throwout="swipped(person)"
        :config="config"
        class="swipe"
      >
        <div class="card" :style="{ 'background-image': `url(${person.url})` }">
          <div class="card__content">
            <h3>{{ person.name }}</h3>
          </div>
        </div>
      </vue-swing>
    </div>
  </div>
</template>

<script>
import VueSwing from "vue-swing";
export default {
  name: "tinder-card",
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
  },
  methods: {
    swipped(person) {
      const index = this.people.findIndex((p) => p.id == person.id);
      this.people.splice(index, 1);
      console.log(`Removing: ${person.name}`);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  background-color: #fff;
  width: 600px;
  padding: 20px;
  max-width: 85vw;
  height: 50vh;
  box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
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
</style>