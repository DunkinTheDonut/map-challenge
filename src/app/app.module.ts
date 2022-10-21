import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { MapComponentComponent } from './map-component/map-component.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    WeatherDetailsComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
