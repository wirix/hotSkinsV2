import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { IAccountFull } from "../interfaces/account.inteface";
import { shopActions } from "../redux/slices/shopSlice";
import { accountActions } from "../redux/slices/accountSlice";
import { inventoryActions } from "../redux/slices/inventorySlice";
import { auth } from '../firebase/initialization';
import { csgoItem } from '../interfaces/items.interface';

export const writeUserData = (user: IAccountFull): void => {
  firebase.database().ref(`users/${user.uid}`).set(user)
    .catch(e => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });
};

export const updateInventoryUserData = (uid: string, inventory: csgoItem[]): void => {
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
      inventory: [],
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

export const getUserData = (dispatch): IAccountFull | undefined => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid: string = user.uid;
        const database = getDatabase();
        const balance = ref(database, 'users/' + uid);
        onValue(balance, (snapshot) => {
          const data: IAccountFull = snapshot.val();
          const { balance, uid, username, email, password, luckyChance, saved, inventory } = data;
          dispatch(shopActions.setSaved(saved));
          dispatch(accountActions.setDataAccount({ balance, uid, username, email, password, luckyChance }));
          dispatch(inventoryActions.setDataInventory(inventory));
        });
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return;
    }
  }
};

export const logout = (): void => {
  signOut(auth);
};

export type typeErrorRegistration = 'auth/email-already-in-use' | 'auth/invalid-email' | 'auth/operation-not-allowed' | 'auth/weak-password' | 'auth/network-request-failed' | 'auth/too-many-requests' | 'auth/user-disabled' | 'auth/internal-error' | 'auth/user-not-found' | 'unknownError' | undefined;

export type typeErrorLogin = 'auth/wrong-password' | 'auth/user-not-found' | 'unknownError' | undefined;