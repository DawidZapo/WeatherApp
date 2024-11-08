import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastBottomSheetComponent } from './forecast-bottom-sheet.component';

describe('ForecastBottomSheetComponent', () => {
  let component: ForecastBottomSheetComponent;
  let fixture: ComponentFixture<ForecastBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
