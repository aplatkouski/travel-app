export interface ICurrency {
  base_code: string; // currency EUR RUB USD
  conversion_rate: number;
  documentation: string;
  result: string;
  target_code: string; // local currency
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
}

export interface IState {
  payload?: ICurrency[];
  error?: Error;
  isLoading: boolean;
}
