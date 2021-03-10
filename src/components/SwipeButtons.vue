<template>
  <div id="swipe-buttons" class="swipe__icons__container">
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
</template>

<script>
import CloseIcon from "vue-material-design-icons/Close.vue";
import StarIcon from "vue-material-design-icons/Star.vue";
import HeartIcon from "vue-material-design-icons/Heart.vue";
export default {
  name: "swipe-buttons",
  components: {
    CloseIcon,
    StarIcon,
    HeartIcon,
  },
};
</script>

<style scoped>
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

.swipe__icon__close:hover, .swipe__icon__star:hover, .swipe__icon__heart:hover {
  transform: scale(1.06);
  transition: all 0.2s ease-in-out;
}

.swipe__icons .material-design-icon__svg {
  background-color: white;
  box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3) !important;
  border-radius: 30px;
  padding: 10px;
}
</style>