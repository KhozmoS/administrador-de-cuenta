export interface Message {
  text: string;
  type: MessageTypes;
}
export enum MessageTypes {
  SUCCESS = "success",
  ERROR = "error"
}