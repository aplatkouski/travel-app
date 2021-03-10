import { fetchFailure, fetchSuccess, startRequest } from 'States/country/actions';
import { Dispatch } from "redux";
import { api } from 'App/constants';

export const getCountyInfoThunk = (id: string, lang: string) => (dispatch: Dispatch) => {
  dispatch(startRequest());
  fetch(`${api}/todos/countryDetailed`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ countryID: id, reloadLang: lang }),
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchSuccess(res));
    })
    .catch(error => {
      dispatch(fetchFailure(error));
    });
};
