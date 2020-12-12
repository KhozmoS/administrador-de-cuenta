import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageTypes } from "../../models";

@Component({
  selector: 'app-footer-message',
  templateUrl: './footer-message.component.html',
  styleUrls: ['./footer-message.component.scss']
})
export class FooterMessageComponent implements OnInit {  
  @Input() message: string;
  @Input() type: MessageTypes;
  @Output() closedMsg = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {    
  }
  get color(): string {
    switch (this.type) {
      case MessageTypes.ERROR:
        return "#d64848";
      case MessageTypes.SUCCESS:
        return "#52a04c";
      default:
        return "transparent"
    }
  }  
  close(): void {
    this.closedMsg.emit();    
  }
}
