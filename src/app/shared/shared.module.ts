import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/';
import { TopFrameComponent } from "./components/top-frame/top-frame.component";
import { FooterMessageComponent } from './components/footer-message/footer-message.component';

import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "./material/material.module";
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoneyColorPipe } from "./pipes/money-color.pipe";
@NgModule({
  declarations: [
    PageNotFoundComponent, 
    WebviewDirective, 
    TopFrameComponent,
    FooterMessageComponent, 
    MoneyColorPipe
  ],
  imports: [
    CommonModule, 
    TranslateModule, 
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    TopFrameComponent,
    FooterMessageComponent,
    FlexLayoutModule,
    MoneyColorPipe
  ]
})
export class SharedModule {}
