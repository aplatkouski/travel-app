import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import CountryMap from './CountryMap';

const mapStateToProps = (state: StateTypes.RootState) => ({
  error: state.country.error,
  isLoading: state.country.isLoading,
  language: state.languageSelector.language,
  lat: state.country.payload && state.country.payload.lat,
  lng: state.country.payload && state.country.payload.lng,
  code: state.country.payload && state.country.payload.alpha2Code,
  capital: state.country.payload && state.country.payload.capital,
});

export default connect(mapStateToProps)(CountryMap);
