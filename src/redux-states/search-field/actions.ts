import * as StateTypes from 'States/types';
import * as t from './action-types';

export const change = (value: string): StateTypes.IAction<string> => ({
  type: t.CHANGE,
  payload: value.toLowerCase(),
});
