import IWeather from 'Entities/weather';

export interface IState {
  weather?: IWeather;
  error?: Error;
  isLoading: boolean;
}
