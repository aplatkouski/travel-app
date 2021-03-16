import IWeather from 'Entities/weather';
import * as StateTypes from 'States/types';
import { WEATHER_API, WEATHER_API_KEY } from '../../constants';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { IState } from './model';

interface IWeatherMain {
  humidity: number;
  pressure: number;
  temp: number;
}

interface IWeatherWind {
  deg: number;
  speed: number;
}

interface IWeatherItem {
  description: string;
  icon: string;
  id: number;
}

interface IWeatherFetch {
  id: number;
  dt: number;
  main: IWeatherMain;
  name: string;
  timezone: string;
  weather: [IWeatherItem];
  wind: IWeatherWind;
}

export const mapWeatherResult = ({
  id,
  dt,
  main,
  name,
  timezone,
  weather,
  wind,
}: IWeatherFetch): IWeather => {
  return {
    cityId: String(id),
    cityName: name,
    date: dt,
    description: weather[0].description,
    humidity: main.humidity,
    icon: weather[0].icon,
    pressure: main.pressure,
    temperature: main.temp,
    timezone,
    windDeg: wind.deg,
    windSpeed: wind.speed,
  };
};

export const getWeatherThunk = (): StateTypes.AsyncDispatch<IState, any> => async (
  dispatch,
  getState
) => {
  const {
    languageSelector: { language },
    country: { country },
    weather: { isLoading },
  } = getState();
  if (!country || isLoading) return;

  dispatch(startRequest());
  try {
    const { lat, lng } = country;
    const params = `?lat=${lat}&lon=${lng}&lang=${language}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await fetch(`${WEATHER_API}${params}`);
    const data = (await response.json()) as IWeatherFetch;
    dispatch(fetchSuccess(mapWeatherResult(data)));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};
