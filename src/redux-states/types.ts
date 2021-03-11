import { ThunkDispatch } from 'redux-thunk';
import { IState as ICountriesState } from 'States/countries/model';
import { IState as ICountryState } from 'States/country/model';
import { IState as ILanguageSelectorState } from 'States/language-selector/model';
import { IState as ISearchFieldState } from 'States/search-field/model';

export interface IAction<P> {
  type: string;
  payload: P;
}

export type Reducer<S, P> = (state: S, action: IAction<P>) => S;

export interface IHandlers<S, P> {
  [key: string]: Reducer<S, P>;
}

// export type RootState = ReturnType<typeof rootReducer>;
export interface RootState {
  countries: ICountriesState;
  country: ICountryState;
  languageSelector: ILanguageSelectorState;
  searchField: ISearchFieldState;
}

export type AsyncDispatch<T, P> = (
  dispatch: ThunkDispatch<T, any, IAction<P>>,
  getState: () => RootState
) => Promise<void>;
