import { Injectable } from '@angular/core';
import { AccountRequestService } from 'app/core/services/server-requests/account.request.service';
import { BehaviorSubject } from 'rxjs';
import { MoneyUpdate } from "../../../../libs/shared/src";

@Injectable({
  providedIn: 'root'
})
export class CalendarStoreService {
  private readonly _moneyUpdates = new BehaviorSubject<MoneyUpdate[]>([]);
  moneyUpdates$ = this._moneyUpdates.asObservable();
  private get moneyUpdates(): MoneyUpdate[] {
    return this._moneyUpdates.getValue();
  }
  private set moneyUpdates(val: MoneyUpdate[]) {
    this._moneyUpdates.next(val);
  }

  constructor(private accountReq: AccountRequestService) { }

  requestDateMoneyUpdates(date: Date): void {
    this.accountReq.getCustomDateUpdates(date).subscribe((data: MoneyUpdate[]) => {
      this.moneyUpdates = data;
    });
  }
}
