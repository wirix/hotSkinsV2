import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { ref, getDatabase, onValue } from 'firebase/database';
import { IAccountFull } from "./interfaces/account.inteface";
import { shopData } from "./interfaces/items.interface";
import { accountAction } from "./redux/slices/accountSlice";
import { inventoryAction } from "./redux/slices/inventorySlice";
import { shopActions } from "./redux/slices/shopSlice";

const firebaseConfig = {
  apiKey: "AIzaSyDN07lGFjcBYAmcXZlcD43hrk6jpqHtbtg",
  authDomain: "hotskins-23b4c.firebaseapp.com",
  projectId: "hotskins-23b4c",
  storageBucket: "hotskins-23b4c.appspot.com",
  messagingSenderId: "438463365403",
  appId: "1:438463365403:web:b07b7df54c5db86d4c13be"
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getUserData = (dispatch) => {
  try {
    console.log('getUserData firebase');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid: string = user.uid;
        const database = getDatabase();
        const balance = ref(database, 'users/' + uid);
        onValue(balance, (snapshot) => {
          const data: IAccountFull = snapshot.val();
          const { balance, uid, username, email, password, luckyChance, saved, inventory } = data;
          dispatch(shopActions.setSaved(saved));
          dispatch(accountAction.setDataAccount({ balance, uid, username, email, password, luckyChance }));
          dispatch(inventoryAction.setDataInventory(inventory));
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const writeUserData = (user: IAccountFull): void => {
  firebase.database().ref(`users/${user.uid}`).set(user)
    .catch(e => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });
};

export const updateInventoryUserData = (uid: string, inventory: shopData): void => {
  firebase.database().ref(`users/${uid}/inventory`).set(inventory)
    .catch(e => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });
};

export const updateBalanceUserData = (uid: string, balance: number): void => {
  firebase.database().ref(`users/${uid}/balance`).set(balance)
    .catch(e => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });
};

export const updateSavedUserData = (uid: string, savedData: number[]): void => {
  firebase.database().ref(`users/${uid}/saved`).set(savedData)
    .catch(e => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });
};

export const registerWithEmailAndPassword = async (username: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userData: IAccountFull = {
      uid: user.uid,
      username,
      email,
      password,
      balance: 30000,
      luckyChance: 0,
      inventory: {
        weapon: [],
        sticker: [],
        graffiti: []
      },
      saved: []
    };
    writeUserData(userData);
  } catch (e) {
    if (e instanceof Error) {
      const regex = /\(([^)]+)\)/;
      const match = regex.exec(e.message);
      const errorMessage = match ? match[1] as typeErrorRegistration : 'unknownError';
      return errorMessage;
    }
  }
};

export const funSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof Error) {
      const regex = /\(([^)]+)\)/;
      const match = regex.exec(e.message);
      const errorMessage = match ? match[1] as typeErrorLogin : 'unknownError';
      return errorMessage;
    }
  }
};

export const logout = (): void => {
  signOut(auth);
};

export type typeErrorRegistration = 'auth/email-already-in-use' | 'auth/invalid-email' | 'auth/operation-not-allowed' | 'auth/weak-password' | 'auth/network-request-failed' | 'auth/too-many-requests' | 'auth/user-disabled' | 'auth/internal-error' | 'auth/user-not-found' | 'unknownError' | undefined;

export type typeErrorLogin = 'auth/wrong-password' | 'auth/user-not-found' | 'unknownError' | undefined;