import { connect } from 'react-redux';
import languageSelector from 'States/language-selector';
import * as StateTypes from 'States/types';
import LanguageSelector from './LanguageSelector';

const mapStateToProps = (state: StateTypes.RootState) => ({
  currentLanguage: state.languageSelector.language,
});

const mapDispatchToProps = {
  onSelect: languageSelector.actions.select,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
