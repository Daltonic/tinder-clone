<template>
  <div class="register__box">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <div class="user__box">
        <input type="text" required minlength="5" v-model="form.fullname" />
        <label>Fullname</label>
      </div>

      <div class="user__box">
        <input type="email" required minlength="10" v-model="form.email" />
        <label>Email</label>
      </div>

      <div class="user__box">
        <input type="password" minlength="6" required v-model="form.password" />
        <label>Password</label>
      </div>

      <div class="user__box">
        <router-link class="forget__link" to="/forget"
          >Forget Password</router-link
        >
      </div>

      <button type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ requesting ? "Log..." : "Register" }}
      </button>
      <router-link class="links" to="/login">Login</router-link>
    </form>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { CometChat } from "@cometchat-pro/chat";
export default {
  data: () => ({
    valid: true,
    requesting: false,
    form: {
      email: "",
      password: "",
      fullname: "",
    }
  }),

  methods: {
    onSubmit() {
      this.requesting = true;
      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.form.fullname,
            })
            .then(() => this.signInWithCometChat(res.user.uid));
        })
        .catch((error) => console.log(error));
    },
    signInWithCometChat(uid) {
      const apiKey = process.env.VUE_APP_KEY;

      const user = new CometChat.User(uid);

      user.setName(this.form.fullname);

      CometChat.createUser(user, apiKey)
        .then(() => this.$router.push({ name: "login" }))
        .catch((error) => console.log("error", error))
        .finally(() => (this.requesting = false));
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

.register__box {
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

.register__box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.register__box .user__box {
  position: relative;
}

.register__box .user__box input {
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
.register__box .user__box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.register__box .user__box input:focus ~ label,
.register__box .user__box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #e90d77;
  font-size: 12px;
}

.register__box form button {
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

.register__box button:hover {
  background: #e90d77;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #e90d77, 0 0 25px #e90d77, 0 0 50px #e90d77,
    0 0 100px #e90d77;
}

.register__box button span {
  position: absolute;
  display: block;
}

.register__box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e90d77);
  animation: btn-anim1 1s linear infinite;
}

.register__box form .forget__link {
  color: white;
  text-decoration: none;
}

.register__box form .forget__link:hover {
  color: #e90d77;
}

.register__box form .links {
  color: white;
  text-decoration: none;
  margin-left: 5px;
  padding: 10px;
}

.register__box form .links:hover {
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

.register__box button span:nth-child(2) {
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

.register__box button span:nth-child(3) {
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

.register__box a span:nth-child(4) {
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