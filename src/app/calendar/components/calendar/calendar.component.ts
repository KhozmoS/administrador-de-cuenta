import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day } from "../../models";
import { CalendarCreatorService } from "../../services";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public monthDays: Day[];
  public monthNumber: number;
  public year: number;
  public weekDaysName = [] as string[];

  constructor(
    public calendarCreator: CalendarCreatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.calendarCreator.getCurrentMonth().then((res: Day[]) => {
      this.setMonthDays(res);
    });
    this.weekDaysName.push("Do");
    this.weekDaysName.push("Lu");
    this.weekDaysName.push("Ma");
    this.weekDaysName.push("Mie");
    this.weekDaysName.push("Jue");
    this.weekDaysName.push("Vie");
    this.weekDaysName.push("Sa");
  }
  onNextMonth(): void {
    this.monthNumber++;
    if (this.monthNumber > 11) {
      this.monthNumber = 0;
      this.year++;
    }
    this.calendarCreator.getMonth(this.monthNumber, this.year).then((resp: Day[]) => {
      this.setMonthDays(resp);
    });
  }
  onPrevMonth(): void {
    this.monthNumber--;
    if (this.monthNumber < 0) {
      this.monthNumber = 11;
      this.year--;
    }
    this.calendarCreator.getMonth(this.monthNumber, this.year).then((resp: Day[]) => {
      this.setMonthDays(resp);
    });
  }
  private setMonthDays(days: Day[]): void {
    this.monthDays = days;  
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
    const reminderDays = (7 - (this.monthDays.length % 7))  % 7;
    for(let i = 0; i < reminderDays; i++) {
      this.monthDays.push({});
    }
  }
  get monthTotalMoney(): number {
    if (this.monthDays) {
      return this.monthDays.reduce((acc: number, day: Day) => {
        return acc + (day.balance || 0);
      }, 0);
    } else {
      return 0;
    }
  }
  goToDayDetails(day: Day): void {
    if (day.number) {
      this.router.navigate(["calendar/day-details", `${day.year}-${day.monthIndex+1}-${day.number}`]);
    }
  }
}
