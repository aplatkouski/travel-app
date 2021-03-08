import type { DBCountries } from 'Entities/country';

const url = 'https://test-travel-app-server.herokuapp.com';
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
  const response = await fetch(`${url}/${countriesUrl}`, options);
  return (await response.json()) as Promise<DBCountries>;
};

export default { fetchCountries };
