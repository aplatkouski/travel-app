import type { IDictionary } from 'Entities/travel-app';

export type Words = 'humidity' | 'temperature' | 'wind';

export const dictionary: IDictionary<Record<Words, string>> = {
  de: {
    humidity: 'luftfeuchtigkeit, %',
    temperature: 'lufttemperatur, °C',
    wind: 'wind, m/s',
  },
  en: {
    humidity: 'humidity, %',
    temperature: 'temperature, °C',
    wind: 'wind, m/s',
  },
  ru: {
    humidity: 'влажность, %',
    temperature: 'температура, °C',
    wind: 'ветер, м/c',
  },
};
