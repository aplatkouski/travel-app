import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { Language } from 'Entities/travel-app';
import { ICredentials, ILogInErrors } from 'Entities/user';
import React, { useRef } from 'react';
import 'Styles/animate.min.css';
import getDictionary from './i18n/translate';

interface Props {
  logInErrors: ILogInErrors | undefined;
  isOpen: boolean;
  onClose: () => void;
  onLogIn: (credentials: ICredentials) => void;
  currentLanguage: Language;
}

const LogInForm = (props: Props): JSX.Element => {
  const { logInErrors, isOpen, onClose: handleClose, onLogIn, currentLanguage } = props;
  const refLoginField = useRef<HTMLInputElement>(null);
  const refPasswordField = useRef<HTMLInputElement>(null);

  const d = getDictionary(currentLanguage);

  const handleLogInUser = () => {
    if (refLoginField.current && refPasswordField.current) {
      onLogIn({
        login: refLoginField.current.value,
        password: refPasswordField.current.value,
      });
    }
  };

  const handleKeyPressOnInput = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleLogInUser();
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        className="animate__animated animate__fadeInDownBig"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={isOpen}
      >
        <DialogTitle id="form-dialog-title">{d.logIn}</DialogTitle>
        <DialogContent>
          {logInErrors && logInErrors.general && (
            <Typography className="animate__animated animate__bounceInLeft" gutterBottom>
              {logInErrors.general}
            </Typography>
          )}
          <FormControl fullWidth>
            <InputLabel htmlFor="login">{d.login}</InputLabel>
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
            {logInErrors && logInErrors.login && (
              <Typography
                className="animate__animated animate__bounceInLeft"
                gutterBottom
              >
                {logInErrors.login}
              </Typography>
            )}
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="password">{d.password}</InputLabel>
            <Input
              fullWidth
              id="password"
              inputRef={refPasswordField}
              margin="dense"
              name="password"
              onKeyUp={handleKeyPressOnInput}
              type="password"
            />
            {logInErrors && logInErrors.password && (
              <Typography
                className="animate__animated animate__bounceInLeft"
                gutterBottom
              >
                {logInErrors.password}
              </Typography>
            )}
          </FormControl>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              {d.cancel}
            </Button>
            <Button color="primary" onClick={handleLogInUser}>
              {d.logIn}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogInForm;
