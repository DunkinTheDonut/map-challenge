import { Component } from '@angular/core';
import {IWeatherData, MapWeatherService} from "../map-weather.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent {
  public weatherData$: Observable<IWeatherData> = this.mapWeatherService.weatherConditions$;

  constructor(private readonly mapWeatherService: MapWeatherService) { }
}
