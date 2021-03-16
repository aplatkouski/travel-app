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
import { ICredentials, ILogInErrors } from 'Entities/user';
import React, { useRef } from 'react';
import 'Styles/animate.min.css';
import { Language } from 'Entities/travel-app';

interface Props {
  logInErrors: ILogInErrors | undefined;
  isOpen: boolean;
  onClose: () => void;
  onLogIn: (credentials: ICredentials) => void;
  currentLanguage: Language;
}

const LOG_IN_TITLE_LABEL = 'LogInTitle';
const LOGIN_LABEL = 'Login';
const PASSWORD_LABEL = 'Password';
const CANCEL_BTN_LABEL = 'Cancel';
const LOGIN_BTN_LABEL = 'LogInBtn';

const Translations = {
  [LOG_IN_TITLE_LABEL]: {
    en: 'Log In',
    ru: 'Войти',
    de: 'Einloggen',
  },
  [LOGIN_LABEL]: {
    en: 'Login',
    ru: 'Логин',
    de: 'Login',
  },
  [PASSWORD_LABEL]: {
    en: 'Password',
    ru: 'Пароль',
    de: 'Passwort',
  },
  [CANCEL_BTN_LABEL]: {
    en: 'CANCEL',
    ru: 'ОТМЕНА',
    de: 'STORNIEREN',
  },
  [LOGIN_BTN_LABEL]: {
    en: 'LOG IN',
    ru: 'ВОЙТИ',
    de: 'Einloggen',
  },
};

const LogInForm = (props: Props): JSX.Element => {
  const { logInErrors, isOpen, onClose: handleClose, onLogIn, currentLanguage } = props;
  const refLoginField = useRef<HTMLInputElement>(null);
  const refPasswordField = useRef<HTMLInputElement>(null);

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
        <DialogTitle id="form-dialog-title">
          {Translations[LOG_IN_TITLE_LABEL][currentLanguage]}
        </DialogTitle>
        <DialogContent>
          {logInErrors && logInErrors.general && (
            <Typography className="animate__animated animate__bounceInLeft" gutterBottom>
              {logInErrors.general}
            </Typography>
          )}
          <FormControl fullWidth>
            <InputLabel htmlFor="login">
              {Translations[LOGIN_LABEL][currentLanguage]}
            </InputLabel>
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
            <InputLabel htmlFor="password">
              {Translations[PASSWORD_LABEL][currentLanguage]}
            </InputLabel>
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
              {Translations[CANCEL_BTN_LABEL][currentLanguage]}
            </Button>
            <Button color="primary" onClick={handleLogInUser}>
              {Translations[LOGIN_BTN_LABEL][currentLanguage]}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogInForm;
