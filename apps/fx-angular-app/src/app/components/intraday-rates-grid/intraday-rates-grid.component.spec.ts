import { AgGridModule } from 'ag-grid-angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntradayRatesGridComponent } from './intraday-rates-grid.component';

describe('IntradayRatesGridComponent', () => {
  let component: IntradayRatesGridComponent;
  let fixture: ComponentFixture<IntradayRatesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntradayRatesGridComponent],
      imports: [AgGridModule.withComponents()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntradayRatesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
