import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';

// SERVICES
import { AccountService } from "./services/store/account.service";
import { AccountRequestService } from "../core/services/server-requests/account.request.service";

@NgModule({
  declarations: [HomeComponent, UpdateAccountComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  providers: [AccountService, AccountRequestService]
})
export class HomeModule {}
