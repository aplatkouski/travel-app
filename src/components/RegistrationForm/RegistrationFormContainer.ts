import RegistrationForm from 'Components/RegistrationForm/RegistrationForm';
import { connect } from 'react-redux';
import * as StateTypes from 'States/types';
import user from 'States/user';

const mapStateToProps = (state: StateTypes.RootState) => ({
  isOpen: state.user.isOpenRegistrationForm,
});

const mapDispatchToProps = {
  onClose: user.actions.closeRegistrationForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
