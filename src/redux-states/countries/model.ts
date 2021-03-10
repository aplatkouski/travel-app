import { Countries } from 'Entities/country';
import { ICountry } from 'Entities/country';

export interface IState {
  all: Countries;
  error?: Error;
  isLoading: boolean;
  selected?: ICountry;
}
