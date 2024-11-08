import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {WeatherService} from './service/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherDTO} from './common/weather';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDivider} from '@angular/material/divider';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ForecastBottomSheetComponent} from './components/forecast-bottom-sheet/forecast-bottom-sheet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDrawerContent, MatLabel, NgIf, MatToolbar, MatIcon, MatFormField, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatInput, MatIconButton, NgForOf, MatButton, NgOptimizedImage, MatProgressSpinner, MatDivider, MatDrawerContainer, MatDrawer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  selectedCity: string = 'Gliwice';
  items: number[] = [1,2,4,2,2,2];
  cityWeather: WeatherDTO | null = null;

  constructor(
    private weatherService: WeatherService,
    private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather(this.selectedCity).subscribe((data) => {
      this.cityWeather = data;
      // console.log(this.cityWeather);
    })

    this.weatherService.getForecastWeather(this.selectedCity).subscribe(data => {
      console.log(data);
    })
  }

  onCardClick(){
    this.bottomSheet.open(ForecastBottomSheetComponent, {panelClass: 'full-screen-bottom-sheet'});
  }

  openForecastBottomSheet(){
    this.bottomSheet.open(ForecastBottomSheetComponent);
  }
}
