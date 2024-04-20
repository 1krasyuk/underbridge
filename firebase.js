// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBqkAl8XVUnMp0rae6Q7J1KFvbCBMgzEdo',
  authDomain: 'underbridge-1.firebaseapp.com',
  projectId: 'underbridge-1',
  storageBucket: 'underbridge-1.appspot.com',
  messagingSenderId: '662352504328',
  appId: '1:662352504328:web:4beb560e7b4953ed0993bd',
  measurementId: 'G-DMZRJ2Z1Q8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
