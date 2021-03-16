import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import CountryMap from './CountryMap';

const mapStateToProps = (state: StateTypes.RootState) => ({
  error: state.country.error,
  isLoading: state.country.isLoading,
  language: state.languageSelector.language,
  lat: state.country.country && state.country.country.lat,
  lng: state.country.country && state.country.country.lng,
});

export default connect(mapStateToProps)(CountryMap);
