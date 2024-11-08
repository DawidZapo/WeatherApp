import { Injectable } from '@angular/core';
import {environment} from '../config/environment';
import {apiEndpoints} from '../config/api-endpoints';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {WeatherDTO} from '../common/weather';
import {convertFromMStoKMH, formatUnixTimeToLocal} from '../utils/utils';
import {WeatherForecastDTO} from '../common/weather-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl: string = apiEndpoints.current;
  private forecastUrl: string = apiEndpoints.forecast;
  private lang: string = apiEndpoints.lang;
  private units: string = apiEndpoints.units;
  private appid: string = environment.appid;

  constructor(private httpClient: HttpClient) { }

  getIconUrl(code: string){
    return apiEndpoints.icon + code + '@2x.png';
  }

  getCurrentWeather(city: string): Observable<WeatherDTO>{
    // const params = this.applyParams(city);
    //
    // return this.httpClient.get<WeatherDTO>(this.weatherUrl, {params}).pipe(
    //   map(response => this.mapApiResponseToWeatherDTO(response))
    // );

    const response = {
      "coord": {
        "lon": 18.6766,
        "lat": 50.2976
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "bezchmurnie",
          "icon": "01n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 8.05,
        "feels_like": 6.09,
        "temp_min": 6.74,
        "temp_max": 9.96,
        "pressure": 1021,
        "humidity": 96,
        "sea_level": 1021,
        "grnd_level": 990
      },
      "visibility": 10000,
      "wind": {
        "speed": 3.13,
        "deg": 335,
        "gust": 5.36
      },
      "clouds": {
        "all": 4
      },
      "dt": 1730501189,
      "sys": {
        "type": 2,
        "id": 2006757,
        "country": "PL",
        "sunrise": 1730439362,
        "sunset": 1730474495
      },
      "timezone": 3600,
      "id": 3099230,
      "name": "Gliwice",
      "cod": 200
    }

    return of(this.mapApiResponseToWeatherDTO(response));

  }

  getForecastWeather(city: string): Observable<WeatherForecastDTO>{
    const params = this.applyParams(city);

    return this.httpClient.get<WeatherForecastDTO>(this.forecastUrl, {params}).pipe(
      map(response => this.mapApiResponseToWeatherForecastDTO(response))
    );
  }

  private applyParams(city: string) {
    return new HttpParams()
      .set('q', city)
      .set('units', this.units)
      .set('lang', this.lang)
      .set('appid', this.appid)
  }

  private mapApiResponseToWeatherDTO(apiResponse: any): WeatherDTO {
    return {
      coord: {
        lon: apiResponse.coord.lon,
        lat: apiResponse.coord.lat,
      },
      weather: apiResponse.weather.map((w: any) => ({
        id: w.id,
        main: w.main,
        description: w.description,
        icon: w.icon,
        iconUrl: this.getIconUrl(w.icon)
      })),
      base: apiResponse.base,
      main: {
        temp: Math.round(apiResponse.main.temp),
        feels_like: apiResponse.main.feels_like,
        temp_min: apiResponse.main.temp_min,
        temp_max: apiResponse.main.temp_max,
        pressure: apiResponse.main.pressure,
        humidity: apiResponse.main.humidity,
        sea_level: apiResponse.main.sea_level,
        grd_level: apiResponse.main.grd_level,
      },
      visibility: Math.round(apiResponse.visibility / 1000),
      wind: {
        speed: Math.round(convertFromMStoKMH(apiResponse.wind.speed)),
        deg: apiResponse.wind.deg,
        gust: Math.round(convertFromMStoKMH(apiResponse.wind.gust)),
      },
      clouds: {
        all: apiResponse.clouds.all,
      },
      dt: apiResponse.dt,
      dtConverted: formatUnixTimeToLocal(apiResponse.dt, apiResponse.timezone),
      sys: {
        type: apiResponse.sys.type,
        id: apiResponse.sys.id,
        country: apiResponse.sys.country,
        sunrise: apiResponse.sys.sunrise,
        sunset: apiResponse.sys.sunset,
        sunriseConverted: formatUnixTimeToLocal(apiResponse.sys.sunrise, apiResponse.timezone),
        sunsetConverted: formatUnixTimeToLocal(apiResponse.sys.sunset, apiResponse.timezone)
      },
      timezone: apiResponse.timezone,
      id: apiResponse.id,
      name: apiResponse.name,
      cod: apiResponse.cod,
    };
  }


  private mapApiResponseToWeatherForecastDTO(apiResponse: any): WeatherForecastDTO {
    return {
      cod: apiResponse.cod,
      message: apiResponse.message,
      cnt: apiResponse.cnt,
      list: apiResponse.list.map((item: any) => ({
        dt: item.dt,
        dtConverted: formatUnixTimeToLocal(item.dt, apiResponse.city.timezone),
        main: {
          temp: Math.round(item.main.temp),
          feels_like: item.main.feels_like,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          pressure: item.main.pressure,
          sea_level: item.main.sea_level,
          grnd_level: item.main.grnd_level,
          humidity: item.main.humidity,
          temp_kf: item.main.temp_kf,
        },
        weather: item.weather.map((w: any) => ({
          id: w.id,
          main: w.main,
          description: w.description,
          icon: w.icon,
          iconUrl: this.getIconUrl(w.icon)
        })),
        clouds: {
          all: item.clouds.all,
        },
        wind: {
          speed: Math.round(convertFromMStoKMH(item.wind.speed)),
          deg: item.wind.deg,
          gust: Math.round(convertFromMStoKMH(item.wind.gust)),
        },
        visibility: Math.round(item.visibility / 1000),
        pop: item.pop,
        rain: item.rain ? { "3h": item.rain["3h"] } : undefined,
        snow: item.snow ? { "3h": item.snow["3h"] } : undefined,
        sys: {
          pod: item.sys.pod,
        },
        dt_txt: item.dt_txt,
      })),
      city: {
        id: apiResponse.city.id,
        name: apiResponse.city.name,
        coord: {
          lat: apiResponse.city.coord.lat,
          lon: apiResponse.city.coord.lon,
        },
        country: apiResponse.city.country,
        population: apiResponse.city.population,
        timezone: apiResponse.city.timezone,
        sunrise: apiResponse.city.sunrise,
        sunset: apiResponse.city.sunset,
        sunriseConverted: formatUnixTimeToLocal(apiResponse.city.sunrise, apiResponse.city.timezone),
        sunsetConverted: formatUnixTimeToLocal(apiResponse.city.sunset, apiResponse.city.timezone),
      }
    };
  }

}
