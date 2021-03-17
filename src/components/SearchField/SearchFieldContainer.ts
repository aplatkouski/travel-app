import { connect } from 'react-redux';
import searchField from 'States/search-field';
import * as StateTypes from 'States/types';
import SearchField from './SearchField';

const mapStateToProps = (state: StateTypes.RootState) => ({
  value: state.searchField.value,
  currentLanguage: state.languageSelector.language,
});

const mapDispatchToProps = {
  onChange: searchField.actions.change,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
