import type { Countries } from 'Entities/country';
import { ICountry } from 'Entities/country';

export interface IState {
  all: Countries;
  error?: typeof Error;
  isLoading: boolean;
  selected?: ICountry;
}
