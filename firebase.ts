import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCEgurAky7K8LwmYynd63_eSHQjDEDO7xo",
  authDomain: "saas-translator-273fd.firebaseapp.com",
  projectId: "saas-translator-273fd",
  storageBucket: "saas-translator-273fd.appspot.com",
  messagingSenderId: "562463093445",
  appId: "1:562463093445:web:967adbe4dca2debb33b6ac",
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
