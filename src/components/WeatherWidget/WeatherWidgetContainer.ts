import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import { getWeatherThunk } from 'States/weather/thunk';
import WeatherWidget from './WeatherWidget';

const mapStateToProps = (state: StateTypes.RootState) => ({
  error: state.country.error,
  isCountryLoading: state.country.isLoading,
  isWeatherLoading: state.weather.isLoading,
  language: state.languageSelector.language,
  lat: state.country.payload && state.country.payload.lat,
  lng: state.country.payload && state.country.payload.lng,
  weather: state.weather.weather,
  weatherError: state.weather.error,
});

const mapDispatchToProps = {
  getWeather: getWeatherThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
