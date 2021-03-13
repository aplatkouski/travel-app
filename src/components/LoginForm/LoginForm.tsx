// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import * as StateTypes from 'States/types';

import user from 'States/user';
import { IUser, ILoginErrs } from 'Entities/user';

import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
  userLogin: (login: string, password: string) => void;
  currUser: IUser | undefined;
  loginErrors: ILoginErrs | undefined;
  clearLoginErrors: () => void;
}

const LoginForm = ({
  open,
  onClose: handleCloseDlg,
  userLogin,
  currUser,
  loginErrors,
  clearLoginErrors,
}: Props): JSX.Element => {
  const refLoginField = useRef<HTMLInputElement>(null);
  const refPasswordField = useRef<HTMLInputElement>(null);

  const handleCloseDialog = useCallback(() => {
    clearLoginErrors();
    handleCloseDlg();
  }, [clearLoginErrors, handleCloseDlg]);

  useEffect(() => {
    if (currUser && currUser.token) {
      handleCloseDialog();
    }
  }, [currUser, handleCloseDialog]);

  const handleLoginUser = () => {
    clearLoginErrors();

    if (refLoginField.current && refPasswordField.current) {
      userLogin(refLoginField.current.value, refPasswordField.current.value);
    }
  };

  const handleKeyPressOnInput = (event: any) => {
    if (event.key === 'Enter') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleLoginUser();
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
        onClose={handleCloseDialog}
        open={open}
      >
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          {loginErrors && loginErrors.generalErr && (
            <Typography gutterBottom>{loginErrors.generalErr}</Typography>
          )}
          <DialogContentText>Please, enter Your login data:</DialogContentText>
          <FormControl fullWidth>
            <InputLabel htmlFor="login">Login</InputLabel>
            <Input
              autoFocus
              fullWidth
              id="login"
              inputRef={refLoginField}
              margin="dense"
              name="login"
              onKeyUp={handleKeyPressOnInput}
              type="text"
            />
            {loginErrors && loginErrors.loginErr && (
              <Typography gutterBottom>{loginErrors.loginErr}</Typography>
            )}
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              fullWidth
              id="password"
              inputRef={refPasswordField}
              margin="dense"
              name="password"
              onKeyUp={handleKeyPressOnInput}
              type="password"
            />
            {loginErrors && loginErrors.passwordErr && (
              <Typography gutterBottom>{loginErrors.passwordErr}</Typography>
            )}
          </FormControl>
          <DialogActions>
            <Button color="primary" onClick={handleCloseDialog}>
              Close
            </Button>
            <Button color="primary" onClick={handleLoginUser}>
              Login
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state: StateTypes.RootState) => ({
  currUser: state.user.user,
  loginErrors: state.user.error,
});

const mapDispatchToProps = {
  userLogin: user.thunk.loginThunk,
  clearLoginErrors: user.thunk.clearLoginErrorsThunk,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
