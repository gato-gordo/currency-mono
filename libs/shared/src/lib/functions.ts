import { CurrencySymbol, CacheKeyParams, Transaction } from './types';
import { currencySymbolLocaleMap } from './constants';
import { Moment } from 'moment';
import moment from 'moment';

const TEN_THOUSAND = 100000;

export const currencyFormatterFactory = (
  symbol: CurrencySymbol,
  sigDif: number = 4
) => {
  const { format } = new Intl.NumberFormat(
    currencySymbolLocaleMap.get(symbol),
    {
      style: 'currency',
      currency: symbol,
      maximumFractionDigits: sigDif,
      minimumFractionDigits: sigDif
    }
  );

  return format;
};

export const toCacheKey = ({ base, quote }: CacheKeyParams) =>
  `${base}:${quote}`;

export const toPipDiff = (end: number, start: number) =>
  Math.round((TEN_THOUSAND * (end - start)) / start);

export const formatUtcMoment = (utcMoment: Moment, ms = false): string => {
  return utcMoment.local().format(`hh:mm${ms ? ':ss' : ''} A`);
};

export const utcStringToLocal = (timeString: string): string => {
  return formatUtcMoment(moment.utc(timeString));
};

export const transactionsToGridProjection = ({
  payAmount,
  payCurrency,
  receiveAmount,
  receiveCurrency,
  payCurrencyBalance,
  receiveCurrencyBalance,
  timestamp
}: Transaction<number>): Transaction<string> => {
  const payFormatter = currencyFormatterFactory(payCurrency, 2);
  const receiveFormatter = currencyFormatterFactory(receiveCurrency, 2);
  return {
    timestamp,
    payCurrency,
    receiveCurrency,
    payAmount: payFormatter(payAmount),
    receiveAmount: receiveFormatter(receiveAmount),
    payCurrencyBalance: payFormatter(payCurrencyBalance),
    receiveCurrencyBalance: receiveFormatter(receiveCurrencyBalance)
  };
};
