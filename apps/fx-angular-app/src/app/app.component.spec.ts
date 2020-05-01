import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoricalRatesGridComponent } from './components/historical-rates-grid/historical-rates-grid.component';
import { HistoricalRatesChartComponent } from './components/historical-rates-chart/historical-rates-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ChartModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatNativeDateModule,
        MatInputModule,
        AgGridModule.withComponents(),
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        HistoricalRatesGridComponent,
        HistoricalRatesChartComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
