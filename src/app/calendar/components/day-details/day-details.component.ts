import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarStoreService } from 'app/calendar/store';
import { map } from 'rxjs/operators';
import { MoneyUpdate } from "../../../../../libs/shared/src";
@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {
  public displayedColumns = ['hora', 'cantidad'];
  public transactions = [] as MoneyUpdate[];
  public dateParam: string;

  constructor(
    private route: ActivatedRoute,
    private calendarStore: CalendarStoreService
  ) { }

  ngOnInit(): void {    
    this.route.params.pipe(
      map(({ date }) => date)
    ).subscribe((data: string) => {
      this.dateParam = data;
      this.calendarStore.requestDateMoneyUpdates(new Date(data));
    });
    this.calendarStore.moneyUpdates$.subscribe((data: MoneyUpdate[]) => {      
      this.transactions = data.sort((a: MoneyUpdate, b: MoneyUpdate) => {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      })
    });
  }
  get totalMoney(): number {
    return this.transactions.map(({ money }) => money).reduce((acc, curr) => acc + curr, 0);
  }
}
