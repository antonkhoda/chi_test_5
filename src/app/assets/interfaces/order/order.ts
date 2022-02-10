import { IBasketRequestArr } from "../basket/basket";

export interface IOrder {
  email: string;
  phone: number;
  address: string;
  basketArr: Array<IBasketRequestArr>;
}
