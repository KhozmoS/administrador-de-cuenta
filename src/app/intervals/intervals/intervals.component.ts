import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { LocalDate } from "../../../../libs/shared/src";
import { IntervalStoreService } from '../store/interval-store.service';
@Component({
  selector: 'app-intervals',
  templateUrl: './intervals.component.html',
  styleUrls: ['./intervals.component.scss']
})
export class IntervalsComponent implements OnInit {
  startDate = new FormControl(new Date(LocalDate.localDate().getFullYear(), 0, 1));
  endDate = new FormControl(LocalDate.localDate());
  money: number;
  loadingMoneyInterval = false;

  constructor(private _storeInterval: IntervalStoreService) { }

  ngOnInit(): void {
    this._storeInterval.loadingMoneyInterval$.subscribe((data: boolean) => this.loadingMoneyInterval = data);
    this._storeInterval.moneyUpdates$.subscribe((data: number) => this.money = data);
    this.requestMoney();
  }
  requestMoney(): void {
    this._storeInterval.requestMoneyInterval(this.startDate.value, this.endDate.value);
  }
}
