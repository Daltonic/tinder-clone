<template>
  <div class="login__box">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="user__box">
        <input type="email" required v-model="form.email" />
        <label>Email</label>
      </div>

      <div class="user__box">
        <input type="password" required v-model="form.password" />
        <label>Password</label>
      </div>

      <div class="user__box">
        <router-link class="forget__link" to="/forget"
          >Forget Password</router-link
        >
      </div>
      <div class="user__box" style="margin-top: 10px; cursor: pointer;">
        <p @click="guestAccount" class="forget__link">Guest Account</p>
      </div>

      <button type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ requesting ? "Log..." : "Login" }}
      </button>
      <router-link class="links" to="/register">Register</router-link>
    </form>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { CometChat } from "@cometchat-pro/chat";
export default {
  data: () => ({
    requesting: false,
    form: {
      email: "",
      password: "",
    },
  }),

  methods: {
    onSubmit() {
      this.requesting = true;
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((res) => this.loginCometChat(res.user))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.requesting = false));
    },
    loginCometChat(user) {
      const apiKey = process.env.VUE_APP_KEY;

      CometChat.login(user.uid, apiKey)
        .then(() => {
          if (user.photoURL) {
            this.$router.push({ name: "home" })
          } else {
            this.$router.push({ name: "profile" })
          }
        })
        .catch((error) => console.log(error))
        .finally(() => (this.requesting = false));
    },
    guestAccount() {
      this.form.email = "lucy@me.com";
      this.form.password = "123456";
      this.onSubmit();
    },
  },
};
</script>

<style>
html {
  background-color: #e90d77;
}

.content {
  background: none;
}

.wrapper {
  position: unset;
}

.login__box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login__box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login__box .user__box {
  position: relative;
}

.login__box .user__box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login__box .user__box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login__box .user__box input:focus ~ label,
.login__box .user__box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #e90d77;
  font-size: 12px;
}

.login__box form button {
  position: relative;
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
  background: none;
  border: none;
}

.login__box button:hover {
  background: #e90d77;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #e90d77, 0 0 25px #e90d77, 0 0 50px #e90d77,
    0 0 100px #e90d77;
}

.login__box button span {
  position: absolute;
  display: block;
}

.login__box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e90d77);
  animation: btn-anim1 1s linear infinite;
}

.login__box form .forget__link {
  color: white;
  text-decoration: none;
}

.login__box form .forget__link:hover {
  color: #e90d77;
}

.login__box form .links {
  color: white;
  text-decoration: none;
  margin-left: 5px;
  padding: 10px;
}

.login__box form .links:hover {
  background: #e90d77;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #e90d77, 0 0 25px #e90d77, 0 0 50px #e90d77,
    0 0 100px #e90d77;
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

.login__box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #e90d77);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
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

.login__box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #e90d77);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
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

.login__box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #e90d77);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
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
</style>