import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import DateTimeWidget from './DateTimeWidget';

const mapStateToProps = (state: StateTypes.RootState) => ({
  error: state.country.error,
  isLoading: state.country.isLoading,
  language: state.languageSelector.language,
  timeZone: state.country.payload
    ? state.country.payload.timezone
    : Intl.DateTimeFormat().resolvedOptions().timeZone,
});

export default connect(mapStateToProps)(DateTimeWidget);
