import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import user from 'States/user';
import LogInForm from './LogInForm';

const mapStateToProps = (state: StateTypes.RootState) => ({
  logInErrors: state.user.logInErrors,
  isOpen: state.user.isOpenLogInForm,
});

const mapDispatchToProps = {
  onClose: user.actions.closeLogInForm,
  onLogIn: user.thunk.logInThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
