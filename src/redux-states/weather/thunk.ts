import IWeather from 'Entities/weather';
import * as StateTypes from 'States/types';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { IState } from './model';

interface IWeatherMain {
  temp: number;
  humidity: number;
  pressure: number;
}

interface IWeatherWind {
  speed: number;
  deg: number;
}

interface IWeatherItem {
  id: number;
  icon: string;
  description: string;
}

interface IWeatherFetch {
  id: number;
  name: string;
  dt: number;
  timezone: string;
  wind: IWeatherWind;
  main: IWeatherMain;
  weather: [IWeatherItem];
}

export const mapWeatherResult = ({
  id,
  dt,
  timezone,
  wind,
  main,
  name,
  weather,
}: IWeatherFetch): IWeather => {
  return {
    cityId: String(id),
    cityName: name,
    date: dt,
    timezone,
    windSpeed: wind.speed,
    windDeg: wind.deg,
    temperature: main.temp,
    humidity: main.humidity,
    pressure: main.pressure,
    description: weather[0].description,
  };
};

const API = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '679070626d7fff4194b0a776c3a2f8a7';

export const getWeatherThunk = (
  lat: number,
  lng: number,
  lang: string
): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  dispatch(startRequest());
  try {
    const params = `?lat=${lat}&lon=${lng}&lang=${lang}&units=metric&appid=${API_KEY}`;
    const response = await fetch(`${API}${params}`);
    const data = (await response.json()) as IWeatherFetch;
    dispatch(fetchSuccess(mapWeatherResult(data)));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};
