import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAmoMqwH7cbMf6N30bW3hzPUn45RQEX_OM',              
  authDomain: 'chatbot-b361d.firebaseapp.com',     
  projectId: 'chatbot-b361d',        
  storageBucket: 'chatbot-b361d.firebasestorage.app',
  messagingSenderId: '64299782055', 
  appId: '1:64299782055:web:1bb2085df6064281e33082',                
  measurementId: 'G-3YZPKWPXDM'
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 
const db = getFirestore(app);

export { auth, provider, db };
