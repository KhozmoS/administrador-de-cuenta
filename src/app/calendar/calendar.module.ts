import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from "../shared/shared.module";

import { CalendarComponent } from './components/calendar/calendar.component';
import { DayDetailsComponent } from './components/day-details/day-details.component';
import { CalendarViewComponent } from './calendar-view.component';

import { CalendarStoreService } from "./store";

@NgModule({
  declarations: [CalendarComponent, DayDetailsComponent, CalendarViewComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule
  ],
  providers: [CalendarStoreService]
})
export class CalendarModule { }
