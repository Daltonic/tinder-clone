<template>
  <div class="call-backdrop">
    <div class="pulse">
      <CometChatAvatar />
    </div>
    <h4>Nancy Dean Calling</h4>
    <div class="call-icons">
      <PhoneIcon
        @click="accept()"
        class="call-icon call-accept"
        :size="20"
        fillColor="#ffffff"
      />
      <PhoneHangupIcon
        @click="reject()"
        class="call-icon call-reject"
        :size="20"
        fillColor="#ffffff"
      />
    </div>
  </div>
</template>

<script>
import PhoneIcon from "vue-material-design-icons/Phone.vue";
import PhoneHangupIcon from "vue-material-design-icons/PhoneHangup.vue";
import { CometChatAvatar } from "../cometchat-pro-vue-ui-kit";
export default {
  name: "incoming-call",
  props: {
    caller: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    accept() {
      this.$emit('accept')
    },
    reject() {
      this.$emit('reject')
    }
  },
  components: {
    PhoneIcon,
    PhoneHangupIcon,
    CometChatAvatar,
  },
};
</script>

<style scoped>
.call-backdrop {
  z-index: 1000;
  background-color: rgb(0, 0, 0);
  opacity: 0.9;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.call-backdrop h4 {
  color: white;
  margin-top: 50px;
}

.pulse i {
  color: #fff;
}

.pulse img {
  object-fit: cover;
}

.pulse {
  height: 100px;
  width: 100px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pulse::before {
  content: "";
  position: absolute;
  border: 1px solid white;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  border-radius: 50%;
  animation: pulse 1s linear infinite;
}

.pulse::after {
  content: "";
  position: absolute;
  border: 1px solid white;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  border-radius: 50%;
  animation: pulse 1s linear infinite;
  animation-delay: 0.3s;
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
.call-icons {
  display: flex;
}

.call-icon {
  padding: 10px;
  border-radius: 50px;
  width: 20px;
  height: 20px;
  margin: 25px 15px;
}

.call-reject {
  background: #e90d77;
}
.call-accept {
  background: #0d98e9;
}
</style>