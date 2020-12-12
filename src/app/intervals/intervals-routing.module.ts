import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntervalsComponent } from "./intervals/intervals.component";

const routes: Routes = [
  {
    path: "intervals",
    component: IntervalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntervalsRoutingModule { }
