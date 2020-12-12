import { ipcMain } from "electron";
import { IpcMainEvent } from "electron/main";
import { MoneyService } from "./services";
import { LocalDate } from "../libs/shared/src"

const moneyService = new MoneyService();
export class MainListener {
  
  constructor() {}
  static init():void {
    updateMoney();
    earnedToday();
    earnedCustomDay();
    updatesCustomDate();
    intervalMoney();
  }
}

function updateMoney() {
  ipcMain.handle("update-money", async (_event:IpcMainEvent, argv:number): Promise<string> => {
    try {
      await moneyService.updateMoney({
        date: LocalDate.localISODate(),
        money: argv
      });
      return "Success";
    } catch (err) {      
      console.log(err);
      return err.message;
    }
  });
}
function earnedToday() {
  ipcMain.handle("[account] today", async (): Promise<number> => {
    try {
      const r = await moneyService.earnedToday();
      return r;
    } catch (err) {      
      console.error(err);
      return err;
    }
  }); 
}
function earnedCustomDay() {
  ipcMain.handle("custom-day-money", async (_event:IpcMainEvent, argv:Date) => {    
    try {
      const r = await moneyService.earnedCustomDay(argv);
      return r;
    } catch (err) {
      console.error(err);
      return err;
    }
  })
}
function updatesCustomDate() {
  ipcMain.handle("custom-date-updates", async (_event:IpcMainEvent, argv:Date) => {    
    try {
      const r = await moneyService.updatesCustomDate(argv);
      return r;
    } catch (err) {
      console.error(err);
      return err;
    }
  })
}
function intervalMoney() {
  ipcMain.handle("interval-date-money", async (_event:IpcMainEvent, argv: { begin: Date, end: Date }) => {    
    try {
      const r = await moneyService.intervalMoney(argv.begin, argv.end);
      return r;
    } catch (err) {
      console.error(err);
      return err;
    }
  })
}
