import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {
  XrangePointOptionsObject,
  SeriesLineOptions,
  XAxisOptions,
  Options
} from 'highcharts';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';
import { FxEntries } from '../../../../../../libs/shared/src/lib/types';
import { utcStringToLocal } from '../../../../../../libs/shared/src/lib/functions';

const fxEntriesToXpointData = (entries: FxEntries) =>
  entries
    .map(
      ([date, { close }]) =>
        ({ name: utcStringToLocal(date), y: close } as XrangePointOptionsObject)
    )
    .reverse();

const seriesDefaults = {
  name: 'Intraday Exchange Rate: 5 Minute Time Series',
  data: [] as XrangePointOptionsObject[],
  type: 'line'
} as SeriesLineOptions;

const xAxisDefaults = {
  type: 'category'
} as XAxisOptions;

@Component({
  selector: 'fx-intraday-chart',
  templateUrl: './intraday-rates-chart.component.html'
})
export class IntradayRatesChartComponent implements OnInit {
  options: Options = {
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: { text: '' }
    },
    xAxis: xAxisDefaults,
    series: [seriesDefaults]
  };

  chart = new Chart(this.options);

  constructor(
    private intradayRates: IntradayRates,
    private currencySelections: CurrencySelectionsService
  ) {}

  private setNewOptions(base, quote, data) {
    this.options = {
      ...this.options,
      yAxis: {
        title: {
          text: `${base}/${quote}`
        }
      },
      xAxis: {
        ...xAxisDefaults,
        labels: { step: Math.ceil(data.length / 6) }
      } as XAxisOptions,
      series: [
        {
          ...seriesDefaults,
          data
        }
      ]
    };
  }

  private setNewChart() {
    this.chart = new Chart(this.options);
  }

  ngOnInit(): void {
    combineLatest([
      this.intradayRates.fxEntries.pipe(map(fxEntriesToXpointData)),
      this.currencySelections.base,
      this.currencySelections.quote
    ]).subscribe(([data, base, quote]) => {
      this.setNewOptions(base, quote, data);
      this.setNewChart();
    });
  }
}
