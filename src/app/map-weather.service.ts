import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, map, Observable, of, switchMap} from "rxjs";
import addHours from 'date-fns/addHours';

interface IWeatherResponse {
  weather: [{main: string}],
  main: {
    temp: number,
    humidity: number,
  },
  wind: {
    speed: number,
    deg: number
  },
  sys: {
    sunrise: number,
    sunset: number
  },
  name: string
}


export interface IWeatherData {
  location: string;
  condition: string;
  temperature: number;
  humidity: number;
  sunrise: Date;
  sunset: Date;
  windSpeed: number;
  windDirection: number;
}

interface ILocationData {
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapWeatherService {
  private mapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvPF3fYkKUPfslN9khW9MGf1oCDeu63gY';
  private weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  private readonly MillisecondsToSecondsConversion = 1000;

  public isApiLoaded$: Observable<boolean> = this.http.jsonp(this.mapsUrl, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );

  private currentPinLocation$$: BehaviorSubject<ILocationData> = new BehaviorSubject<{lat: number; lon: number}>(null);
  public weatherConditions$: Observable<IWeatherData> = this.currentPinLocation$$.pipe(
    filter((location) => !!location),
    switchMap((location) => {

      return this.http.get<IWeatherResponse>(this.weatherUrl, {params: {
        lat: location.lat,
          lon: location.lon,
          appid: 'f8ddf24506101123743c1252afa1704b',
          units: 'imperial'
        }})
    }),
    map((weatherData) => {
      return {
        location: weatherData.name,
        condition: weatherData.weather[0].main,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        sunrise: new Date(weatherData.sys.sunrise * this.MillisecondsToSecondsConversion),
        sunset: new Date(weatherData.sys.sunset * this.MillisecondsToSecondsConversion),
        windDirection: weatherData.wind.deg,
        windSpeed: weatherData.wind.speed
      }
    })
  );

  constructor(
    private readonly http: HttpClient
  ) { }

  public setWeatherLocation(latitude: number, longitude: number) {
    this.currentPinLocation$$.next({lat: latitude, lon: longitude})
  }
}
