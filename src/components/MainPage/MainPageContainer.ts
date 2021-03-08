import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import MainPage from './MainPage';

const mapStateToProps = (state: StateTypes.RootState) => ({
  allCountries: state.countries.all,
  isLoading: state.countries.isLoading,
});

export default connect(mapStateToProps)(MainPage);
