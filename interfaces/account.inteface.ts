import { shopData } from "./items.interface";

export interface IAccount {
  balance: number;
  uid: string;
  username: string;
  email: string;
  password: string;
  luckyChance: number;
  isAuth?: boolean;
}

export interface IAccountFull extends IAccount {
  inventory: shopData;
  saved: number[];
}