import type { Countries } from 'Entities/country';

export interface IState {
  all: Countries;
  error?: Error;
  isLoading: boolean;
}
