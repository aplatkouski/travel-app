import { IDictionary } from 'Entities/travel-app';

export type Words = 'humidity' | 'temperature' | 'wind' | 'weather';

export const dictionary: IDictionary<Record<Words, string>> = {
  de: {
    humidity: 'luftfeuchtigkeit, %',
    temperature: 'lufttemperatur, °C',
    wind: 'wind, m/s',
    weather: 'Wetter',
  },
  en: {
    humidity: 'humidity, %',
    temperature: 'temperature, °C',
    wind: 'wind, m/s',
    weather: 'Weather',
  },
  ru: {
    humidity: 'влажность, %',
    temperature: 'температура, °C',
    wind: 'ветер, м/c',
    weather: 'Погода',
  },
};
