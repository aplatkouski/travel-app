import { connect } from 'react-redux';
import countries from 'States/countries';
import App from './App';

const mapDispatchToProps = {
  fetchCountries: countries.actions.fetchCountries,
};

export default connect(undefined, mapDispatchToProps)(App);
