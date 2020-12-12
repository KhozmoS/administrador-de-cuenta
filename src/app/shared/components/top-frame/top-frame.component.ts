import { Component, OnInit } from '@angular/core';
import { ElectronService } from "../../../core/services";

@Component({
  selector: 'app-top-frame',
  templateUrl: './top-frame.component.html',
  styleUrls: ['./top-frame.component.scss']
})
export class TopFrameComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {    
  }
  minimizeWindow():void {
    this.electronService.window.minimize();
  }
  closeWindow():void {
    this.electronService.window.close();
  }
}
