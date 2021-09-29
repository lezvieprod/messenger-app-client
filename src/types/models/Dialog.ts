import { IUser } from "./User";

export interface IDialog {
  _id: string,
  createDate: Date,
  firstOwner: IUser,
  secondOwner: IUser,
  lastMessage: string,
}
