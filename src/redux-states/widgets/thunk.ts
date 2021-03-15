import * as StateTypes from 'States/types';
import { ICurrency, IState } from 'States/widgets/reducer';
import { fetchFailure, fetchSuccess, startRequest } from './actions';

const url = 'https://v6.exchangerate-api.com';
const apiKey = '9744e03c0ec00e7c17efdd7e';

export interface IConverter {
  localCurrency: string;
  toCurrency: string;
}

const createRequest = (converter: IConverter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { localCurrency, toCurrency } = converter;
      const getCurrencyUrl = `${url}/v6/${apiKey}/pair/${toCurrency}/${localCurrency}`;
      const response = await fetch(getCurrencyUrl);
      const data = (await response.json()) as ICurrency;
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
};

export const getCurrenciesThunk = (converters: IConverter[]): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  dispatch(startRequest());
  try {
    const data = await Promise.all(converters.map((converter) => createRequest(converter)));
    dispatch(fetchSuccess(data as ICurrency[]));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

