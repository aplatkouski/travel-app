import { api } from 'App/constants';
import { DBCountries } from 'Entities/country';

const countriesUrl = 'todos/countries';

const fetchCountries = async (): Promise<DBCountries> => {
  const data = {
    reloadLang: 'en',
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${api}/${countriesUrl}`, options);
  return (await response.json()) as Promise<DBCountries>;
};

export default { fetchCountries };
