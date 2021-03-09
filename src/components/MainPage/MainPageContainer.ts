import { connect } from 'react-redux';
import countries from 'States/countries';
import * as StateTypes from 'States/types';
import MainPage from './MainPage';

const mapStateToProps = (state: StateTypes.RootState) => ({
  allCountries: state.countries.all,
  isLoading: state.countries.isLoading,
});

const mapDispatchToProps = {
  selectCountry: countries.actions.selectCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);