import * as StateTypes from 'States/types';
import { EXCHANGERATE_API, EXCHANGERATE_API_KEY } from '../../constants';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { ICurrency, IState } from './model';

export interface IConverter {
  localCurrency: string;
  toCurrency: string;
}

const createRequest = (converter: IConverter) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { localCurrency, toCurrency } = converter;
      const getCurrencyUrl = `${EXCHANGERATE_API}/v6/${EXCHANGERATE_API_KEY}/pair/${toCurrency}/${localCurrency}`;
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
