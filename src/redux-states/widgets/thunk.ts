import * as StateTypes from 'States/types';
import { ICurrency, IState } from 'States/widgets/reducer';
import { fetchFailure, fetchSuccess, startRequest } from './actions';

const url = 'https://v6.exchangerate-api.com';
const apiKey = '9744e03c0ec00e7c17efdd7e';

// const createRequest = (localCurrency: string) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       //const { toCurrency } = converter;
//       //const getCurrencyUrl =
//       // `${url}/api/v7/convert?q=${toCurrency}_${fromCurrency}&compact=ultra&apiKey=${apiKey}`;
//       const getCurrencyUrl = `${url}/v6/${apiKey}/latest/${localCurrency}`;
//       const response = await fetch(getCurrencyUrl);
//       const data = (await response.json()) as ICurrency;
//       resolve(data);
//     } catch (e) {
//       reject(e);
//     }
//   })
// };

// export const getCurrenciesThunk = (converters: IConverter[]): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
//   dispatch(startRequest());
//   try {
//     const data = await Promise.all(converters.map((converter) => createRequest(converter)));
//     dispatch(fetchSuccess(data as ICurrency));
//   } catch (error) {
//     dispatch(fetchFailure(error));
//   }
// };

export const getCurrencyThunk = (
  localCurrency: string
): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  dispatch(startRequest());
  try {
    // to USD EUR RUB
    const getCurrencyUrl = `${url}/v6/${apiKey}/latest/${localCurrency}`;
    const response = await fetch(getCurrencyUrl);
    const data = (await response.json()) as ICurrency;
    dispatch(fetchSuccess(data));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};
