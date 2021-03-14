interface ILanguage {
  temperature: string;
  humidity: string;
  wind: string;
}

interface IDictionary {
  [key: string]: ILanguage;
}

export const dictionary: IDictionary = {
  en: {
    temperature: 'temperature, °C',
    humidity: 'humidity, %',
    wind: 'wind, m/s',
  },
  ru: {
    temperature: 'температура, °C',
    humidity: 'влажность, %',
    wind: 'ветер, м/c',
  },
  de: {
    temperature: 'lufttemperatur, °C',
    humidity: 'luftfeuchtigkeit, %',
    wind: 'wind, m/s',
  },
};
