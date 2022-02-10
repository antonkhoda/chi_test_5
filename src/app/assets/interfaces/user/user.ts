export interface IUser {
  uid: string,
  email: string | null,
  role: string
}

export interface IUserBasket {
  id: number,
  count: number,
}