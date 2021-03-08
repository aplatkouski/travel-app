import { ICountry } from 'Entities/country';

export type Countries = Array<ICountry>;

export interface IState {
  all: Countries;
  error?: typeof Error;
  isLoading: boolean;
}
