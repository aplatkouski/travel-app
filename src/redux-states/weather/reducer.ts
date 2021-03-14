import IWeather from 'Entities/weather';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const initialState: IState = {
  weather: undefined,
  error: undefined,
  isLoading: false,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.FETCH_WEATHER.FAILURE]: (state, { payload: error }: StateTypes.IAction<Error>) => ({
    ...state,
    isLoading: false,
    error,
  }),
  [t.FETCH_WEATHER.START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.FETCH_WEATHER.SUCCESS]: (
    state,
    { payload: weather }: StateTypes.IAction<IWeather>
  ) => ({
    ...state,
    isLoading: false,
    error: undefined,
    weather,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;
