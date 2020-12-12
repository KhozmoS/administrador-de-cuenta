import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntervalsRoutingModule } from './intervals-routing.module';
import { SharedModule } from "../shared/shared.module";
import { IntervalsComponent } from './intervals/intervals.component';

import { IntervalStoreService } from "./store/interval-store.service";

@NgModule({
  declarations: [IntervalsComponent],
  imports: [
    CommonModule,
    IntervalsRoutingModule,
    SharedModule
  ],
  providers: [IntervalStoreService]
})
export class IntervalsModule { }
