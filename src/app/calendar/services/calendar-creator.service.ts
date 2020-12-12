import { Injectable } from '@angular/core';
import { AccountRequestService } from 'app/core/services/server-requests/account.request.service';
import { first } from "rxjs/operators";
import { Day } from "../models";
import { LocalDate } from "../../../../libs/shared/src";

@Injectable({
  providedIn: 'root'
})
export class CalendarCreatorService {
  private currentYear: number;
  private currentMonthIndex: number;

  constructor(
    private accountRequest: AccountRequestService
  ) { 
    const date = LocalDate.localDate();
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth();
  }
  public getCurrentMonth(): Promise<Day[]> {
    return this.getMonth(this.currentMonthIndex, this.currentYear);
  }
  public getWeekDayName(weekDay: number): string {
    switch(weekDay) {
      case 0:
        return "Do"; // Domingo
      case 1:
        return "Lu";
      case 2:
        return "Ma";
      case 3:
        return "Mie";
      case 4:
        return "Jue";
      case 5:
        return "Vie";
      case 6:
        return "Sa";
      default:
        return "";
    }
  }
  public getMonthName(monthDay: number): string {
    switch(monthDay) {
      case 0:
        return "Enero";
      case 1: 
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";

      default: 
        return "";
    }    
  }
  private async createDay(dayNumber: number, monthIndex: number, year: number): Promise<Day> {
    const day = new Date(year, monthIndex, dayNumber);
    const isToday = day.toISOString().substr(0, 10) === LocalDate.localISODate().substr(0, 10);
    const balance = await this.accountRequest.getCustomDayMoney(day).pipe(
      first()
    ).toPromise();
    const wdn = day.getDay(); // WeekDayNumber
    return {
      monthIndex: monthIndex,
      month: this.getMonthName(monthIndex),
      number: dayNumber,
      year,
      weekDayNumber: wdn,
      weekDayName: this.getWeekDayName(wdn),
      balance,
      isToday
    } as Day;
  }
  public async getMonth(monthIndex: number, year: number): Promise<Day[]> {
    const days = [] as Day[];
    const firstday = await this.createDay(1, monthIndex, year);
    for(let i = 0; i < firstday.weekDayNumber; ++i) {
      days.push({
        weekDayNumber: i,
        monthIndex: monthIndex,
        year: year
      }) as Day;
    }
    days.push(firstday);
    const countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for(let i = 2; i <= countDaysInMonth; i++) {
      days.push(await this.createDay(i, monthIndex, year));
    }
    return days;
  }
}
