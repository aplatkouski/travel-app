import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import { getWeatherThunk } from 'States/weather/thunk';
import WeatherWidget from './WeatherWidget';

const mapStateToProps = (state: StateTypes.RootState) => ({
  language: state.languageSelector.language,
  lat: state.country.country && state.country.country.lat,
  lng: state.country.country && state.country.country.lng,
  isLoading: state.country.isLoading,
  error: state.country.error,
  isWeatherLoading: state.weather.isLoading,
  weatherError: state.weather.error,
  weather: state.weather.weather,
});

const mapDispatchToProps = {
  getWeather: getWeatherThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
