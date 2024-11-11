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
    // const params = this.applyParams(city);
    //
    // return this.httpClient.get<WeatherForecastDTO>(this.forecastUrl, {params}).pipe(
    //   map(response => this.mapApiResponseToWeatherForecastDTO(response))
    // );

    const response = {
      "cod": "200",
      "message": 0,
      "cnt": 40,
      "list": [
        {
          "dt": 1731337200,
          "main": {
            "temp": 4.73,
            "feels_like": 4.73,
            "temp_min": 4.73,
            "temp_max": 5.55,
            "pressure": 1028,
            "sea_level": 1028,
            "grnd_level": 996,
            "humidity": 47,
            "temp_kf": -0.82
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01d"
            }
          ],
          "clouds": {
            "all": 0
          },
          "wind": {
            "speed": 0.89,
            "deg": 203,
            "gust": 1.04
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-11 15:00:00"
        },
        {
          "dt": 1731348000,
          "main": {
            "temp": 4.49,
            "feels_like": 3.26,
            "temp_min": 4.01,
            "temp_max": 4.49,
            "pressure": 1028,
            "sea_level": 1028,
            "grnd_level": 996,
            "humidity": 49,
            "temp_kf": 0.48
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 0
          },
          "wind": {
            "speed": 1.58,
            "deg": 171,
            "gust": 1.57
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-11 18:00:00"
        },
        {
          "dt": 1731358800,
          "main": {
            "temp": 3.64,
            "feels_like": 2.58,
            "temp_min": 3.09,
            "temp_max": 3.64,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 997,
            "humidity": 55,
            "temp_kf": 0.55
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03n"
            }
          ],
          "clouds": {
            "all": 32
          },
          "wind": {
            "speed": 1.37,
            "deg": 181,
            "gust": 1.25
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-11 21:00:00"
        },
        {
          "dt": 1731369600,
          "main": {
            "temp": 2.36,
            "feels_like": 2.36,
            "temp_min": 2.36,
            "temp_max": 2.36,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 997,
            "humidity": 65,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03n"
            }
          ],
          "clouds": {
            "all": 36
          },
          "wind": {
            "speed": 0.76,
            "deg": 141,
            "gust": 0.73
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-12 00:00:00"
        },
        {
          "dt": 1731380400,
          "main": {
            "temp": 1.61,
            "feels_like": 1.61,
            "temp_min": 1.61,
            "temp_max": 1.61,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 997,
            "humidity": 70,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03n"
            }
          ],
          "clouds": {
            "all": 42
          },
          "wind": {
            "speed": 0.85,
            "deg": 38,
            "gust": 0.85
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-12 03:00:00"
        },
        {
          "dt": 1731391200,
          "main": {
            "temp": 1.19,
            "feels_like": 1.19,
            "temp_min": 1.19,
            "temp_max": 1.19,
            "pressure": 1030,
            "sea_level": 1030,
            "grnd_level": 998,
            "humidity": 70,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03d"
            }
          ],
          "clouds": {
            "all": 39
          },
          "wind": {
            "speed": 1.15,
            "deg": 28,
            "gust": 1.15
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-12 06:00:00"
        },
        {
          "dt": 1731402000,
          "main": {
            "temp": 5.08,
            "feels_like": 4.19,
            "temp_min": 5.08,
            "temp_max": 5.08,
            "pressure": 1031,
            "sea_level": 1031,
            "grnd_level": 999,
            "humidity": 53,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03d"
            }
          ],
          "clouds": {
            "all": 37
          },
          "wind": {
            "speed": 1.39,
            "deg": 19,
            "gust": 1.88
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-12 09:00:00"
        },
        {
          "dt": 1731412800,
          "main": {
            "temp": 7.48,
            "feels_like": 6.25,
            "temp_min": 7.48,
            "temp_max": 7.48,
            "pressure": 1030,
            "sea_level": 1030,
            "grnd_level": 998,
            "humidity": 43,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03d"
            }
          ],
          "clouds": {
            "all": 42
          },
          "wind": {
            "speed": 2.01,
            "deg": 2,
            "gust": 2.58
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-12 12:00:00"
        },
        {
          "dt": 1731423600,
          "main": {
            "temp": 5.26,
            "feels_like": 3.49,
            "temp_min": 5.26,
            "temp_max": 5.26,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 998,
            "humidity": 51,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03d"
            }
          ],
          "clouds": {
            "all": 30
          },
          "wind": {
            "speed": 2.18,
            "deg": 343,
            "gust": 2.64
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-12 15:00:00"
        },
        {
          "dt": 1731434400,
          "main": {
            "temp": 3.42,
            "feels_like": 1.87,
            "temp_min": 3.42,
            "temp_max": 3.42,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 997,
            "humidity": 59,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 801,
              "main": "Clouds",
              "description": "pochmurnie",
              "icon": "02n"
            }
          ],
          "clouds": {
            "all": 21
          },
          "wind": {
            "speed": 1.71,
            "deg": 360,
            "gust": 1.89
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-12 18:00:00"
        },
        {
          "dt": 1731445200,
          "main": {
            "temp": 2.09,
            "feels_like": 0.07,
            "temp_min": 2.09,
            "temp_max": 2.09,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 997,
            "humidity": 65,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 69
          },
          "wind": {
            "speed": 1.92,
            "deg": 333,
            "gust": 2.22
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-12 21:00:00"
        },
        {
          "dt": 1731456000,
          "main": {
            "temp": 0.87,
            "feels_like": -0.93,
            "temp_min": 0.87,
            "temp_max": 0.87,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 996,
            "humidity": 65,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 83
          },
          "wind": {
            "speed": 1.61,
            "deg": 302,
            "gust": 1.74
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-13 00:00:00"
        },
        {
          "dt": 1731466800,
          "main": {
            "temp": -0.03,
            "feels_like": -2.15,
            "temp_min": -0.03,
            "temp_max": -0.03,
            "pressure": 1028,
            "sea_level": 1028,
            "grnd_level": 996,
            "humidity": 66,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 99
          },
          "wind": {
            "speed": 1.74,
            "deg": 305,
            "gust": 1.95
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-13 03:00:00"
        },
        {
          "dt": 1731477600,
          "main": {
            "temp": -0.69,
            "feels_like": -0.69,
            "temp_min": -0.69,
            "temp_max": -0.69,
            "pressure": 1028,
            "sea_level": 1028,
            "grnd_level": 996,
            "humidity": 72,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 85
          },
          "wind": {
            "speed": 1.24,
            "deg": 290,
            "gust": 1.46
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-13 06:00:00"
        },
        {
          "dt": 1731488400,
          "main": {
            "temp": 2.72,
            "feels_like": 0.89,
            "temp_min": 2.72,
            "temp_max": 2.72,
            "pressure": 1029,
            "sea_level": 1029,
            "grnd_level": 996,
            "humidity": 62,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 60
          },
          "wind": {
            "speed": 1.85,
            "deg": 288,
            "gust": 2.3
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-13 09:00:00"
        },
        {
          "dt": 1731499200,
          "main": {
            "temp": 5.06,
            "feels_like": 3.6,
            "temp_min": 5.06,
            "temp_max": 5.06,
            "pressure": 1027,
            "sea_level": 1027,
            "grnd_level": 996,
            "humidity": 61,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03d"
            }
          ],
          "clouds": {
            "all": 36
          },
          "wind": {
            "speed": 1.85,
            "deg": 302,
            "gust": 2.23
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-13 12:00:00"
        },
        {
          "dt": 1731510000,
          "main": {
            "temp": 3.42,
            "feels_like": 1.79,
            "temp_min": 3.42,
            "temp_max": 3.42,
            "pressure": 1027,
            "sea_level": 1027,
            "grnd_level": 995,
            "humidity": 70,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01d"
            }
          ],
          "clouds": {
            "all": 4
          },
          "wind": {
            "speed": 1.77,
            "deg": 312,
            "gust": 1.97
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-13 15:00:00"
        },
        {
          "dt": 1731520800,
          "main": {
            "temp": 1.8,
            "feels_like": 0.11,
            "temp_min": 1.8,
            "temp_max": 1.8,
            "pressure": 1028,
            "sea_level": 1028,
            "grnd_level": 996,
            "humidity": 75,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 5
          },
          "wind": {
            "speed": 1.63,
            "deg": 295,
            "gust": 1.98
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-13 18:00:00"
        },
        {
          "dt": 1731531600,
          "main": {
            "temp": 0.57,
            "feels_like": -1.58,
            "temp_min": 0.57,
            "temp_max": 0.57,
            "pressure": 1028,
            "sea_level": 1028,
            "grnd_level": 996,
            "humidity": 84,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 5
          },
          "wind": {
            "speed": 1.83,
            "deg": 287,
            "gust": 2.24
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-13 21:00:00"
        },
        {
          "dt": 1731542400,
          "main": {
            "temp": -0.25,
            "feels_like": -0.25,
            "temp_min": -0.25,
            "temp_max": -0.25,
            "pressure": 1027,
            "sea_level": 1027,
            "grnd_level": 995,
            "humidity": 86,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 5
          },
          "wind": {
            "speed": 1.33,
            "deg": 285,
            "gust": 1.66
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-14 00:00:00"
        },
        {
          "dt": 1731553200,
          "main": {
            "temp": -0.7,
            "feels_like": -2.8,
            "temp_min": -0.7,
            "temp_max": -0.7,
            "pressure": 1026,
            "sea_level": 1026,
            "grnd_level": 994,
            "humidity": 88,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 1
          },
          "wind": {
            "speed": 1.66,
            "deg": 268,
            "gust": 2.13
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-14 03:00:00"
        },
        {
          "dt": 1731564000,
          "main": {
            "temp": -0.82,
            "feels_like": -2.56,
            "temp_min": -0.82,
            "temp_max": -0.82,
            "pressure": 1026,
            "sea_level": 1026,
            "grnd_level": 993,
            "humidity": 92,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01d"
            }
          ],
          "clouds": {
            "all": 3
          },
          "wind": {
            "speed": 1.42,
            "deg": 263,
            "gust": 1.78
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-14 06:00:00"
        },
        {
          "dt": 1731574800,
          "main": {
            "temp": 2.99,
            "feels_like": 0.98,
            "temp_min": 2.99,
            "temp_max": 2.99,
            "pressure": 1025,
            "sea_level": 1025,
            "grnd_level": 993,
            "humidity": 71,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01d"
            }
          ],
          "clouds": {
            "all": 7
          },
          "wind": {
            "speed": 2.04,
            "deg": 249,
            "gust": 2.79
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-14 09:00:00"
        },
        {
          "dt": 1731585600,
          "main": {
            "temp": 5.51,
            "feels_like": 3.23,
            "temp_min": 5.51,
            "temp_max": 5.51,
            "pressure": 1023,
            "sea_level": 1023,
            "grnd_level": 991,
            "humidity": 60,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 801,
              "main": "Clouds",
              "description": "pochmurnie",
              "icon": "02d"
            }
          ],
          "clouds": {
            "all": 15
          },
          "wind": {
            "speed": 2.85,
            "deg": 239,
            "gust": 4.06
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-14 12:00:00"
        },
        {
          "dt": 1731596400,
          "main": {
            "temp": 3.87,
            "feels_like": 1.81,
            "temp_min": 3.87,
            "temp_max": 3.87,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 70,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 84
          },
          "wind": {
            "speed": 2.24,
            "deg": 211,
            "gust": 3.25
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-14 15:00:00"
        },
        {
          "dt": 1731607200,
          "main": {
            "temp": 2.24,
            "feels_like": -0.13,
            "temp_min": 2.24,
            "temp_max": 2.24,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 79,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 90
          },
          "wind": {
            "speed": 2.26,
            "deg": 220,
            "gust": 3.77
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-14 18:00:00"
        },
        {
          "dt": 1731618000,
          "main": {
            "temp": 2.86,
            "feels_like": 0.28,
            "temp_min": 2.86,
            "temp_max": 2.86,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 76,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 60
          },
          "wind": {
            "speed": 2.59,
            "deg": 225,
            "gust": 5.79
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-14 21:00:00"
        },
        {
          "dt": 1731628800,
          "main": {
            "temp": 3.18,
            "feels_like": 0.18,
            "temp_min": 3.18,
            "temp_max": 3.18,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 74,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 80
          },
          "wind": {
            "speed": 3.18,
            "deg": 235,
            "gust": 8.68
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-15 00:00:00"
        },
        {
          "dt": 1731639600,
          "main": {
            "temp": 3.39,
            "feels_like": 0.75,
            "temp_min": 3.39,
            "temp_max": 3.39,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 75,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 100
          },
          "wind": {
            "speed": 2.78,
            "deg": 242,
            "gust": 7.17
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-15 03:00:00"
        },
        {
          "dt": 1731650400,
          "main": {
            "temp": 3.62,
            "feels_like": 1.41,
            "temp_min": 3.62,
            "temp_max": 3.62,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 79,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 100
          },
          "wind": {
            "speed": 2.34,
            "deg": 241,
            "gust": 5.58
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-15 06:00:00"
        },
        {
          "dt": 1731661200,
          "main": {
            "temp": 4.61,
            "feels_like": 2.31,
            "temp_min": 4.61,
            "temp_max": 4.61,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 991,
            "humidity": 78,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 100
          },
          "wind": {
            "speed": 2.65,
            "deg": 250,
            "gust": 5.66
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-15 09:00:00"
        },
        {
          "dt": 1731672000,
          "main": {
            "temp": 7.02,
            "feels_like": 4.83,
            "temp_min": 7.02,
            "temp_max": 7.02,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 73,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "zachmurzenie duże",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 100
          },
          "wind": {
            "speed": 3.15,
            "deg": 277,
            "gust": 5.02
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-15 12:00:00"
        },
        {
          "dt": 1731682800,
          "main": {
            "temp": 5.24,
            "feels_like": 3.67,
            "temp_min": 5.24,
            "temp_max": 5.24,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 80,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 803,
              "main": "Clouds",
              "description": "zachmurzenie umiarkowane",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 54
          },
          "wind": {
            "speed": 1.98,
            "deg": 251,
            "gust": 2.96
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-15 15:00:00"
        },
        {
          "dt": 1731693600,
          "main": {
            "temp": 3.86,
            "feels_like": 1.66,
            "temp_min": 3.86,
            "temp_max": 3.86,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 85,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03n"
            }
          ],
          "clouds": {
            "all": 35
          },
          "wind": {
            "speed": 2.38,
            "deg": 207,
            "gust": 3.68
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-15 18:00:00"
        },
        {
          "dt": 1731704400,
          "main": {
            "temp": 2.98,
            "feels_like": 0.27,
            "temp_min": 2.98,
            "temp_max": 2.98,
            "pressure": 1022,
            "sea_level": 1022,
            "grnd_level": 990,
            "humidity": 87,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 2
          },
          "wind": {
            "speed": 2.77,
            "deg": 208,
            "gust": 6.1
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-15 21:00:00"
        },
        {
          "dt": 1731715200,
          "main": {
            "temp": 2.31,
            "feels_like": -0.58,
            "temp_min": 2.31,
            "temp_max": 2.31,
            "pressure": 1021,
            "sea_level": 1021,
            "grnd_level": 989,
            "humidity": 88,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 1
          },
          "wind": {
            "speed": 2.83,
            "deg": 210,
            "gust": 6.36
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-16 00:00:00"
        },
        {
          "dt": 1731726000,
          "main": {
            "temp": 2.59,
            "feels_like": -0.85,
            "temp_min": 2.59,
            "temp_max": 2.59,
            "pressure": 1020,
            "sea_level": 1020,
            "grnd_level": 988,
            "humidity": 86,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "bezchmurnie",
              "icon": "01n"
            }
          ],
          "clouds": {
            "all": 8
          },
          "wind": {
            "speed": 3.62,
            "deg": 208,
            "gust": 9.27
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-16 03:00:00"
        },
        {
          "dt": 1731736800,
          "main": {
            "temp": 3.19,
            "feels_like": -0.4,
            "temp_min": 3.19,
            "temp_max": 3.19,
            "pressure": 1020,
            "sea_level": 1020,
            "grnd_level": 988,
            "humidity": 82,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03n"
            }
          ],
          "clouds": {
            "all": 28
          },
          "wind": {
            "speed": 4.05,
            "deg": 212,
            "gust": 10.35
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2024-11-16 06:00:00"
        },
        {
          "dt": 1731747600,
          "main": {
            "temp": 5.8,
            "feels_like": 2.18,
            "temp_min": 5.8,
            "temp_max": 5.8,
            "pressure": 1019,
            "sea_level": 1019,
            "grnd_level": 987,
            "humidity": 69,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 802,
              "main": "Clouds",
              "description": "zachmurzenie małe",
              "icon": "03d"
            }
          ],
          "clouds": {
            "all": 43
          },
          "wind": {
            "speed": 5.36,
            "deg": 210,
            "gust": 10.71
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-16 09:00:00"
        },
        {
          "dt": 1731758400,
          "main": {
            "temp": 8.16,
            "feels_like": 4.87,
            "temp_min": 8.16,
            "temp_max": 8.16,
            "pressure": 1017,
            "sea_level": 1017,
            "grnd_level": 985,
            "humidity": 59,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 801,
              "main": "Clouds",
              "description": "pochmurnie",
              "icon": "02d"
            }
          ],
          "clouds": {
            "all": 22
          },
          "wind": {
            "speed": 6.11,
            "deg": 212,
            "gust": 11.15
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2024-11-16 12:00:00"
        }
      ],
      "city": {
        "id": 3099230,
        "name": "Gliwice",
        "coord": {
          "lat": 50.2976,
          "lon": 18.6766
        },
        "country": "PL",
        "population": 198835,
        "timezone": 3600,
        "sunrise": 1731304377,
        "sunset": 1731337553
      }
    }

    return of(this.mapApiResponseToWeatherForecastDTO(response));
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
