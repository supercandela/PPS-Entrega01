import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
 
import { AppRoutingModule } from './app-routing.module';
import {
  RouteReuseStrategy,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}