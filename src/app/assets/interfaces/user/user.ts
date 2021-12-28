export interface IUser {
  uid: string,
  email: string | null,
  liked: Array<number>,
  basket: Array<IUserBasket>,
  role: string
}

export interface IUserBasket {
  id: number,
  count: number,
}