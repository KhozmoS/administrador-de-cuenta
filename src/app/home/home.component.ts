import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/store/account.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  todayMoney = null;
  constructor(
    private router: Router,
    private accountService: AccountService) {}
  get date(): string {
    return new Date().toISOString().substr(0, 10);
  }
  ngOnInit(): void {    
    this.accountService.todayMoney$.subscribe(mny => this.todayMoney = mny);
  }
}
