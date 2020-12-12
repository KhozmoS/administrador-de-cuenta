declare type DateString = string;
export interface MoneyUpdate {
  _id?: number;
  money: number;
  date: DateString;
}