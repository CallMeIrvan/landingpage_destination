// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDkrMoTmM1YYC96GR5-iZZgHPlR26JO8Ec',
  authDomain: 'sumba-tourism-admin.firebaseapp.com',
  projectId: 'sumba-tourism-admin',
  storageBucket: 'sumba-tourism-admin.firebasestorage.app',
  messagingSenderId: '616718555881',
  appId: '1:616718555881:web:6632a299cd3ca94c84ee78',
  measurementId: 'G-TZNLC5S3MV',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
