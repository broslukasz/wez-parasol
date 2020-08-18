import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherbitForecastData, WeatherbitHourlyForecast } from '../models/forecast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  rainStatus = 'Będzie padać ';
  rainCommand: string;
  rainProbability: number;
  hoursToRain: number;
  headerText: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.weatherService.getForecastForCurrentLocation().subscribe((forecast: WeatherbitHourlyForecast) => {
      this.announceRainStatus(forecast.data);
    } );
  }

  doRefresh(refresher) {
    this.weatherService.getForecastForCurrentLocation().subscribe((forecast: WeatherbitHourlyForecast) => {
      this.announceRainStatus(forecast.data);
      refresher.target.complete();
    } );
  }

  private announceRainStatus(data: WeatherbitForecastData[]): void {
    const rainHour = data.find(this.willBeRaining);

    this.hoursToRain = data.findIndex(this.willBeRaining);
    this.rainProbability = rainHour ? rainHour.pop : 0;
    this.rainCommand = rainHour ? 'Weź parasol' : 'Zostaw parasol';
  }

  private willBeRaining(hourData) {
    return hourData.pop > 0;
  }
}
