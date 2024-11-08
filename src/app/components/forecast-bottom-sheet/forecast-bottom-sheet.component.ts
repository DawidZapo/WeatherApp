import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-forecast-bottom-sheet',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './forecast-bottom-sheet.component.html',
  styleUrl: './forecast-bottom-sheet.component.css'
})
export class ForecastBottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<ForecastBottomSheetComponent>) {
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

}
