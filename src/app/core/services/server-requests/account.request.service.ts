import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from "..";
import { MoneyUpdate } from '../../../../../libs/shared/src';
@Injectable({
  providedIn: 'root'
})
export class AccountRequestService {
  private readonly channelPrefix = "[account]";
  constructor(private electron: ElectronService) { }
  getTodayMoney(): Observable<number> {
    return new Observable(subscriber => {
      this.electron.ipcRenderer.invoke(this.channelPrefix+" today")
        .then((resp:number) => {
          subscriber.next(resp)
        })
        .catch(err => {
          subscriber.error(err);
        })
        .finally(() => subscriber.complete());
    })
  }
  getCustomDayMoney(day: Date): Observable<number>  {    
    return new Observable(subscriber => {
      this.electron.ipcRenderer.invoke("custom-day-money", day)
        .then((resp:number) => {
          subscriber.next(resp)
        })
        .catch(err => {
          subscriber.error(err);
        })
        .finally(() => subscriber.complete());
    });
  }
  getCustomDateUpdates(date: Date): Observable<MoneyUpdate[]> {
    return new Observable(subscriber => {
      this.electron.ipcRenderer.invoke("custom-date-updates", date)
        .then((resp:MoneyUpdate[]) => {
          subscriber.next(resp)
        })
        .catch(err => {
          subscriber.error(err);
        })
        .finally(() => subscriber.complete());
    });
  }
  getIntervalMoney(body: { begin: Date, end: Date}): Observable<number> {
    return new Observable(subscriber => {
      this.electron.ipcRenderer.invoke("interval-date-money", body)
        .then((resp:number) => {
          subscriber.next(resp)
        })
        .catch(err => {
          subscriber.error(err);
        })
        .finally(() => subscriber.complete());
    });
  }
}
