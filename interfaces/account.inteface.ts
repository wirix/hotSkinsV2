import { TypeAllItems } from "./items.interface";

export interface IAccount {
  balance: number;
  uid: string;
  username: string;
  email: string;
  password: string;
  luckyChance: number;
}

export interface IAccountFull extends IAccount {
  inventory: TypeAllItems[];
}