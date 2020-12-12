import { Injectable } from '@angular/core';
import { Message } from 'app/shared/models/message.model';
import { BehaviorSubject } from 'rxjs';
import { AccountRequestService } from '../../../core/services/server-requests/account.request.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private clearingMessageTimeout: NodeJS.Timeout;
  constructor(private accountRequests: AccountRequestService){}

  private readonly _message = new BehaviorSubject<Message>({
    text: null,
    type: null
  });
  private readonly _todayMoney = new BehaviorSubject<number>(0);

  readonly message$ = this._message.asObservable();
  readonly todayMoney$ = this._todayMoney.asObservable();

  private get message(): Message {
    return this._message.getValue();
  }
  private set message(val: Message) {
    this._message.next(val);
  }
  private get todayMoney(): number {
    return this._todayMoney.getValue();
  }
  private set todayMoney(val: number) {
    this._todayMoney.next(val);
  }
  requestToday(): void {
    this.accountRequests.getTodayMoney().subscribe((money: number) => {
      this.todayMoney = money;
    });
  }
  setMessage(val: Message): void {
    this.resetTimeout();
    this.message = val;
  }
  clearMessage(): void {
    this.message = {
      text: null,
      type: this.message.type
    };
  }
  resetTimeout(): void {
    if (this.clearingMessageTimeout) {
      clearTimeout(this.clearingMessageTimeout);
    }
    this.clearingMessageTimeout = setTimeout(() => {
      this.clearMessage();
    }, 1500);
  }
}
