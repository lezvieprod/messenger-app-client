export interface IUser {
  _id: string
  email: string,
  password?: string,
  firstName: string,
  lastName: string,
  regDate: Date,
  dialogsCount: number
}
export interface ICurrentUser extends IUser {
  token: string,
}
export interface IUserAuthorize {
  token: string,
  _id: string,
}