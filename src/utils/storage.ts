import type { Countries } from 'Entities/country';
import { ICountry } from 'Entities/country';
import type ID from 'Entities/id';
import type { Language } from 'Entities/travel-app';

const url = 'https://travel-app-backend-service.herokuapp.com';
const countriesUrl = 'todos/countries';
const countryUrl = 'todos/countryDetailed';

const fetchCountries = async (language: Language = 'en'): Promise<Countries> => {
  const data = {
    countriesNum: 9,
    reloadLang: language,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${url}/${countriesUrl}`, options);
  return (await response.json()) as Promise<Countries>;
};

const fetchCountry = async ({
  id,
  language = 'en',
}: {
  id: ID;
  language: Language;
}): Promise<ICountry> => {
  const data = {
    countryID: id,
    reloadLang: language,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${url}/${countryUrl}`, options);
  return (await response.json()) as Promise<ICountry>;
};

export default {
  fetchCountries,
  fetchCountry,
};
