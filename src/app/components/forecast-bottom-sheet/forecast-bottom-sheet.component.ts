import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {WeatherForecastDTO} from '../../common/weather-forecast';
import {WeatherService} from '../../service/weather.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  BarController, BarElement,
  CategoryScale,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {MatActionList} from '@angular/material/list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
Chart.register(CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


@Component({
  selector: 'app-forecast-bottom-sheet',
  standalone: true,
  imports: [
    MatButton, BaseChartDirective, MatStepper, MatStep, MatStepperNext, MatStepperPrevious, MatIcon, NgIf, MatActionList, MatStepLabel, MatProgressSpinner
  ],
  templateUrl: './forecast-bottom-sheet.component.html',
  styleUrl: './forecast-bottom-sheet.component.css'
})
export class ForecastBottomSheetComponent implements OnInit{

  cityForecast: WeatherForecastDTO | null = null;
  selectedCity: string = 'Gliwice';
  currentStep = 0;

  public everyThreeHourChart: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature (°C)',
        borderColor: 'rgba(75,192,192,1)',
        fill: false
      }
    ]
  };

  public dailyChart: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature (°C)',
        borderColor: 'rgba(75,192,192,1)',
        fill: false
      }
    ]
  };

  public snowChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Rain/Snow (mm)',
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
      }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Date/Time' },
      },
      y: {
        title: { display: true, text: 'Temperature (°C)' },
        beginAtZero: false
      }
    }
  };
  public chartLegend = true;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ForecastBottomSheetComponent>,
    private weatherService: WeatherService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.weatherService.getForecastWeather(this.selectedCity).subscribe({
      next: (data) => {
        this.cityForecast = data;
        console.log(data);
        this.prepareEveryThreeHourData();
        this.prepareDailyChart();
        this.prepareSnowData();
      },
      error: (error) => {
        if(error.status === 404){
          this.snackBar.open(`Nie znaleziono miasta`, `Zamknij`, {duration: 3000});
        }
        else{
          this.snackBar.open('Oops... mamy problem pobrać dane', 'Zamknij', {duration: 3000});
        }
      }
    });
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  prepareEveryThreeHourData(): void {
    if (this.cityForecast) {
      const labels = this.cityForecast.list.map(item => item.dt_txt);
      const temperatures = this.cityForecast.list.map(item => item.main.temp);

      this.everyThreeHourChart.labels = labels;
      this.everyThreeHourChart.datasets[0].data = temperatures;
    }
  }

  prepareDailyChart(): void {
    if (this.cityForecast) {
      const dailyTemperatures: { [key: string]: number[] } = {};

      this.cityForecast.list.forEach(item => {

        const date = item.dt_txt.split(' ')[0];

        if (!dailyTemperatures[date]) {
          dailyTemperatures[date] = [];
        }
        dailyTemperatures[date].push(item.main.temp);
      });

      const labels = Object.keys(dailyTemperatures);
      const temperatures = labels.map(date => {
        const temps = dailyTemperatures[date];
        const averageTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        return averageTemp;
      });

      this.dailyChart.labels = labels;
      this.dailyChart.datasets[0].data = temperatures;
    }
  }


  prepareSnowData(): void {
    if (this.cityForecast) {
      const dailyRainfall: { [key: string]: number[] } = {};

      this.cityForecast.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];

        if (item.rain) {
          if (!dailyRainfall[date]) {
            dailyRainfall[date] = [];
          }
          dailyRainfall[date].push(item.rain['3h']);
        } else if (item.snow) {
          if (!dailyRainfall[date]) {
            dailyRainfall[date] = [];
          }
          dailyRainfall[date].push(item.snow['3h']);
        }
      });

      const labels = Object.keys(dailyRainfall);
      const rainfall = labels.map(date => {
        const rainData = dailyRainfall[date];
        const totalRain = rainData ? rainData.reduce((sum, rain) => sum + rain, 0) : 0;
        return totalRain;
      });

      this.snowChartData.labels = labels;
      this.snowChartData.datasets[0].data = rainfall;
    }
  }

  setStep(index: number): void {
    this.currentStep = index;
  }

}
