import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import user from 'States/user';
import Header from './Header';

const mapStateToProps = (state: StateTypes.RootState) => ({
  currentUser: state.user.current,
  currentLanguage: state.languageSelector.language,
});

const mapDispatchToProps = {
  handleLogOut: user.actions.logOut,
  handleOpenLogInForm: user.actions.openLogInForm,
  handleOpenRegistrationForm: user.actions.openRegistrationForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
