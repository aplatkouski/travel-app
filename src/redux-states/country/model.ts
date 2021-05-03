import { ICountry } from 'Entities/country';

export interface IState {
  payload?: ICountry;
  error?: Error;
  isLoading: boolean;
}
