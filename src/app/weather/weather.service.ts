import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { WeatherbitHourlyForecast } from '../models/forecast';

interface Coordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface Position {
  readonly coords: Coordinates;
  readonly timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
      private http: HttpClient,
  ) { }

  getForecastForCurrentLocation(): Observable<WeatherbitHourlyForecast> {
    return from(new Promise<any>((resolve) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        resolve(position);
      });
    })).pipe(
        mergeMap((position: Position) => {
          const hours = this.calculateHours();
          return this.http.get<WeatherbitHourlyForecast>(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=pl&key=635bf53034854830b7f6935482fed58f&hours=${hours}`);
        }),
        first(),
    );

  }

  private calculateHours(): number {
    return 24 - new Date().getHours();
  }
}
