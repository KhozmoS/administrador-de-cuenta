import { moneyDB } from "./database";
import { MoneyUpdate, LocalDate } from "./../../libs/shared/src";

export class MoneyService {
  constructor() {}
  async updateMoney(data: MoneyUpdate): Promise<MoneyUpdate> {
    return new Promise((resolve) => {
      moneyDB.insert(data, (err, doc: MoneyUpdate) => {
        if (err) {
          console.log(err);
          throw err;
        }
        resolve({ ...doc });
      });
    })
  }
  earnedToday(): Promise<number> {
    return this.earnedCustomDay(LocalDate.localDate());
  }
  earnedCustomDay(day: Date): Promise<number> {    
    return new Promise(resolve => {
      this.updatesCustomDate(day)
        .then((docs: MoneyUpdate[]) => {
          resolve(getUpdatesMoneySum(docs));
        })
        .catch(err => {
          throw err;
        })
    });
  }
  updatesCustomDate(day: Date): Promise<MoneyUpdate[]> {
    const lowLimit = day.toISOString().substr(0, 10);
    day.setDate(day.getDate() + 1);
    const hiLimit = day.toISOString().substr(0, 10);
    return new Promise(resolve => {
      moneyDB.find({ date: { $gte: lowLimit, $lt: hiLimit } }).exec((err, docs: MoneyUpdate[]): void => {
        if (err) {
          throw err;
        }
        resolve(docs);
      });
    });
  }
  intervalMoney(begin: Date, end: Date): Promise<number> {
    end.setDate(end.getDate() + 1);
    const lowLimit = begin.toISOString().substr(0, 10);
    const hiLimit = end.toISOString().substr(0, 10);
    return new Promise(resolve => {
      moneyDB.find({ date: { $gte: lowLimit, $lt: hiLimit } }).exec((err, docs: MoneyUpdate[]): void => {
        if (err) {
          throw err;
        }
        resolve(getUpdatesMoneySum(docs));
      });
    });
  }
}
function getUpdatesMoneySum(docs: MoneyUpdate[]): number {
  return docs.reduce((prev: number, curr: MoneyUpdate) => {          
    return prev + curr.money;
  }, 0);
}