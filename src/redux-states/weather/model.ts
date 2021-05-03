import IWeather from 'Entities/weather';

export interface IState {
  error?: Error;
  isLoading: boolean;
  weather?: IWeather;
}
