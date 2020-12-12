import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from "./components/calendar/calendar.component";
import { DayDetailsComponent } from './components/day-details/day-details.component';
import { CalendarViewComponent } from "./calendar-view.component";
const routes: Routes = [
  {
    path: "calendar",
    component: CalendarViewComponent,
    children: [
      {
        path: "",
        component: CalendarComponent,
      },
      {
        path: "day-details/:date",
        component: DayDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
