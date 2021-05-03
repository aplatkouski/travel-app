import { Language } from 'Entities/travel-app';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export const select = (language: Language): StateTypes.IAction<Language> => ({
  type: t.SELECT,
  payload: language,
});
