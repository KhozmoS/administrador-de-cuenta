import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'app/core/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'app/home/services/store/account.service';
import { Message, MessageTypes } from 'app/shared/models';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {  
  updateBtnText = "Guardar";
  userMessage = {
    text: null,
    type: null
  } as Message;
  updateForm = new FormGroup({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    money: new FormControl(null, Validators.required),
  });
  constructor(
    private electroService: ElectronService,
    private accountService: AccountService
  ) { 
  }
  
  ngOnInit(): void {
    this.accountService.requestToday();
    this.accountService.message$.subscribe(msg => this.userMessage = msg);
  }
  save(): void {
    if (this.updateForm.valid) {
      const money = this.updateForm.controls.money.value;
      this.updateBtnText = "Loading...";
      this.electroService.ipcRenderer.invoke("update-money", money as number)
        .then(() => {
          this.accountService.requestToday();
          this.accountService.setMessage({
            text: "Su cuenta ha sido actualizada con exito.",
            type: MessageTypes.SUCCESS
          });
        })
        .catch((err) => {
          this.accountService.setMessage({
            text: err,
            type: MessageTypes.ERROR
          });
        })
        .finally(() => { 
          this.resetForm();
        });
    } else {
      this.accountService.setMessage({
        text: "Introduzca alguna cantidad.",
        type: MessageTypes.ERROR
      })
    }
  }
  closedMessage(): void {
    this.accountService.clearMessage();
  }
  resetForm(): void {
    this.updateForm.reset();
    this.updateBtnText = "Guardar";
  }
}
