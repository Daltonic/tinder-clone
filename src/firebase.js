import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_BASE_APIKEY,
  authDomain: process.env.VUE_APP_BASE_AUTHDOMAIN,
  projectId: process.env.VUE_APP_BASE_PROJECTID,
  storageBucket: process.env.VUE_APP_BASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_BASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_BASE_APPID,
  measurementId: process.env.VUE_APP_BASE_MEASUREMENTID,
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.database()

export { auth, db }
