import { connect } from 'react-redux';
import country from 'States/country';
import * as StateTypes from 'States/types';
import MainPage from './MainPage';

const mapStateToProps = (state: StateTypes.RootState) => ({
  allCountries: state.countries.all,
  filter: state.searchField.value,
});

const mapDispatchToProps = {
  selectCountry: country.thunk.getCountryThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
