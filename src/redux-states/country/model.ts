import { ICountry } from 'Entities/country';

export interface IState {
  country?: ICountry;
  error?: Error;
  isLoading: boolean;
}
