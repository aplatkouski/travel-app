import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import DateTimeWidget from './DateTimeWidget';

const mapStateToProps = (state: StateTypes.RootState) => ({
  language: state.languageSelector.language,
  timezone: state.country && state.country.country && state.country.country.timezone,
  isLoading: state.country.isLoading,
  error: state.country.error,
});

export default connect(mapStateToProps)(DateTimeWidget);
