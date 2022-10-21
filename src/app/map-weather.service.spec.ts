import { TestBed } from '@angular/core/testing';

import { MapWeatherService } from './map-weather.service';

describe('MapWeatherService', () => {
  let service: MapWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
