import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MapWeatherService} from "../map-weather.service";

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {
  public apiLoaded: Observable<boolean>;
  public mapMarker: google.maps.LatLng;
  constructor(private readonly mapWeatherService: MapWeatherService) { }

  ngOnInit(): void {
    this.apiLoaded = this.mapWeatherService.isApiLoaded$;
  }

  processMapClick($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    this.mapMarker = $event.latLng;
    this.mapWeatherService.setWeatherLocation($event.latLng.lat(), $event.latLng.lng());
  }
}
