interface IWeather {
  cityId: string;
  cityName: string;
  date: number;
  description: string;
  humidity: number;
  icon: string;
  pressure: number;
  temperature: number;
  timezone: string;
  windDeg: number;
  windSpeed: number;
}

export default IWeather;
