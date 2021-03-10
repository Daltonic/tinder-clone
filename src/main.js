import Vue from 'vue'
import App from './App.vue'
import { CometChat } from '@cometchat-pro/chat'

Vue.config.productionTip = false

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
    new Vue({
      render: (h) => h(App),
    }).$mount('#app')
  },
  (error) => {
    console.log('Initialization failed with error:', error)
    // Check the reason for error and take appropriate action.
  }
)
