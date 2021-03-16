import {IDictionary} from 'Entities/travel-app';

export type Words = 'exchange' | 'rate';

export const dictionary: IDictionary<Record<Words, string>> = {
  de: {
    exchange: '',
    rate: 'Tauschrate',
  },
  en: {
    exchange: 'Exchange',
    rate: 'Rate',
  },
  ru: {
    exchange: 'Курс',
    rate: 'валют',
  },
};
