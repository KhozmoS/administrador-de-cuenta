import { Injectable } from '@angular/core';
import { AccountRequestService } from 'app/core/services/server-requests/account.request.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntervalStoreService {
  private readonly _moneyInterval = new BehaviorSubject<number>(0);
  moneyUpdates$ = this._moneyInterval.asObservable();

  private readonly _loadingMoneyInterval = new BehaviorSubject<boolean>(false);
  loadingMoneyInterval$ = this._loadingMoneyInterval.asObservable();

  private get moneyInterval(): number {
    return this._moneyInterval.getValue();
  }
  private set moneyInterval(val: number) {
    this._moneyInterval.next(val);
  }
  private get loadingMoneyInterval(): boolean {
    return this._loadingMoneyInterval.getValue();
  }
  private set loadingMoneyInterval(val: boolean) {
    this._loadingMoneyInterval.next(val);
  }
  constructor(private accountReq: AccountRequestService) { }

  requestMoneyInterval(begin: Date, end: Date): void {
    this.loadingMoneyInterval = true;
    setTimeout(() => {
      this.accountReq.getIntervalMoney({ begin, end }).subscribe((data: number) => {
        this.moneyInterval = data;
        this.loadingMoneyInterval = false;
      });
    }, 500);
  }

}
