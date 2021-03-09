import { ThunkDispatch } from 'redux-thunk';
import { IState as ILanguageSelectorState } from 'States/language-selector/model';

export interface IAction<P> {
  type: string;
  payload: P;
}

export type Reducer<S, P> = (state: S, action: IAction<P>) => S;

export interface IHandlers<S, P> {
  [key: string]: Reducer<S, P>;
}

export type AsyncDispatch<T, P> = (
  dispatch: ThunkDispatch<T, any, IAction<P>>,
  getState: () => {
    [key: string]: T;
  }
) => Promise<void>;

export interface RootState {
  languageSelector: ILanguageSelectorState;
}