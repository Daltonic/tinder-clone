import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CometChat } from '@cometchat-pro/chat'
import { auth } from './firebase'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const authenticatedUser = auth.currentUser
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authenticatedUser) {
    console.log('You are not authorized to access this area.')
    next('login')
  } else {
    next()
  }
})

const appID = process.env.VUE_APP_ID
const region = process.env.VUE_APP_REGION
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build()

CometChat.init(appID, appSetting).then(
  () => {
    console.log('Initialization completed successfully')
    // You can now call login function.
    let app
    auth.onAuthStateChanged(() => {
      if (!app) {
        new Vue({
          router,
          render: (h) => h(App),
        }).$mount('#app')
      }
    })
  },
  (error) => {
    console.log('Initialization failed with error:', error)
    // Check the reason for error and take appropriate action.
  }
)
