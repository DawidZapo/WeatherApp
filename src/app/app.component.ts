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
import {WeatherDTO} from './common/weather';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDivider} from '@angular/material/divider';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ForecastBottomSheetComponent} from './components/forecast-bottom-sheet/forecast-bottom-sheet.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDrawerContent, MatLabel, NgIf, MatToolbar, MatIcon, MatFormField, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatInput, MatIconButton, NgForOf, MatButton, NgOptimizedImage, MatProgressSpinner, MatDivider, MatDrawerContainer, MatDrawer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  // selectedCity: string = 'Gliwice';
  // items: number[] = [1,2,4,2,2,2];
  // selectedCities: string[] = [];
  title: string = 'Weather App';
  citiesWeather: Map<string,WeatherDTO> = new Map<string, WeatherDTO>();
  citiesWeatherValues: WeatherDTO[] = [];

  constructor(
    private weatherService: WeatherService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getSelectedCitiesFromLocalStorage().forEach(city => {
      this.applyCityWeather(city);
    });

  }

  private applyCityWeather(city: string, newCity?: boolean){
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.citiesWeather.set(city.toUpperCase(),data);
        if(!this.getSelectedCitiesFromLocalStorage().includes(city)){
          this.applyCityToLocalStorage(city);
        }
        console.log(this.getSelectedCitiesFromLocalStorage());
      },
      error: (error) => {
        if(error.status === 404){
          this.snackBar.open(`Nie znaleziono miasta ${city}`, `Zamknij`, {duration: 3000});
        }
        else{
          this.snackBar.open('Oops... mamy problem pobrać dane', 'Zamknij', {duration: 3000});
        }
      }
    });
  }

  private applyCityToLocalStorage(city: string){
    let cities = localStorage.getItem('cities');
    if(cities){
      localStorage.setItem('cities', cities + city.toUpperCase() + ',');
    }
    else{
      localStorage.setItem('cities', city.toUpperCase() + ',');
    }
  }

  private deleteCityFromLocalStorage(city: string): void {
    const cities = localStorage.getItem('cities');

    if (cities) {
      const updatedCities = cities
        .split(',')
        .filter(storedCity => storedCity.trim().toUpperCase() !== city.toUpperCase()) // Remove the matching city
        .join(',');
      localStorage.setItem('cities', updatedCities);
    }
  }


  private getSelectedCitiesFromLocalStorage(): string[] {
    const cities = localStorage.getItem('cities');
    if (cities) {
      return cities
        .split(',')
        .filter(city => city.trim() !== '')
        .map(city => city.trim().toUpperCase());
    } else {
      return [];
    }
  }

  onCardClick(){
    this.bottomSheet.open(ForecastBottomSheetComponent, {panelClass: 'full-screen-bottom-sheet'});
  }

  onSearchClick(searchInput: HTMLInputElement){
    const searchValue = searchInput.value.toUpperCase().trim();
    console.log(this.getSelectedCitiesFromLocalStorage());
    if(!this.citiesWeather.get(searchValue)){
      this.applyCityWeather(searchValue.toUpperCase());
      searchInput.value = '';
    }
  }

  onDeleteClick(city: string, event: Event){
    event.stopPropagation();
    this.deleteCityFromLocalStorage(city.toUpperCase());
    this.citiesWeather.delete(city.toUpperCase());
  }

  openForecastBottomSheet(){
    this.bottomSheet.open(ForecastBottomSheetComponent);
  }

  getCitiesWeatherArray() {
    return (this.citiesWeatherValues = Array.from(this.citiesWeather.values()));
  }

}
