export interface IMessage {
  _id?: string,
  message: string,
  author: string,
  sendDate?: Date,
  dialogId: string,
  ownerId: string,
}