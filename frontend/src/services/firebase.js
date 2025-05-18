import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN1EmmYItF7dQxhqO5T7FE6fgGsCrH-H8",
  authDomain: "routegenie-12fox.firebaseapp.com",
  projectId: "routegenie-12fox",
  storageBucket: "routegenie-12fox.firebasestorage.app",
  messagingSenderId: "521855165132",
  appId: "1:521855165132:web:21d6642f6197af1b2d5869"
  
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;