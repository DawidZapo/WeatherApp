import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatLabel, NgIf, MatToolbar, MatIcon, MatFormField, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatInput, MatIconButton, NgForOf, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeatherApp';

  items = [1];
}
