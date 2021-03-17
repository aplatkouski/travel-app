import * as StateTypes from 'States/types';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { ICurrency, IState } from './model';

const url = 'https://v6.exchangerate-api.com';
const apiKey = '9744e03c0ec00e7c17efdd7e';

export interface IConverter {
  localCurrency: string;
  toCurrency: string;
}

const createRequest = (converter: IConverter) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
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
  });
};

export const getCurrenciesThunk = (
  converters: IConverter[]
): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  dispatch(startRequest());
  try {
    const data = await Promise.all(
      converters.map((converter) => createRequest(converter))
    );
    dispatch(fetchSuccess(data as ICurrency[]));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
