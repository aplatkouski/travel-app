interface IWeather {
  cityId: string;
  cityName: string;
  date: number;
  timezone: string;
  windSpeed: number;
  windDeg: number;
  temperature: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
}

export default IWeather;
