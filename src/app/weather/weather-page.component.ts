import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherbitForecastData, WeatherbitHourlyForecast } from '../Models/forecast';

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

  constructor(
      private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.weatherService.getForecastForCurrentLocation().subscribe((forecast: WeatherbitHourlyForecast) => {
      this.announceRainStatus(forecast.data);
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
