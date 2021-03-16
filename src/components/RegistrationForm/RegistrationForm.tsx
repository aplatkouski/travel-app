import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';
import 'Styles/animate.min.css';
import { Language } from 'Entities/travel-app';
import {
  api,
  SUCCESSFUL_REGISTRATION_MESSAGE,
  USER_REGISTRATION_API,
} from '../../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

interface IRegistrationErrors {
  general: string | null | undefined;
  login: string | null | undefined;
  name: string | null | undefined;
  password: string | null | undefined;
}

interface IResponse {
  errors: Array<{ param: keyof IRegistrationErrors; msg: string }>;
  message: string;
}

const SIGN_UP_LABEL = 'SignUp';
const USER_NAME_LABEL = 'Name';
const LOGIN_LABEL = 'Login';
const PASSWORD_LABEL = 'Password';
const CHOOSE_FILE_LABEL = 'ChooseFile';
const CANCEL_BTN_LABEL = 'Cancel';
const REGISTER_BTN_LABEL = 'Register';
const CLOSE_BTN_LABEL = 'Close';

const Translations = {
  [SIGN_UP_LABEL]: {
    en: 'Sign Up',
    ru: 'Регистрация',
    de: 'Einchecken',
  },
  [USER_NAME_LABEL]: {
    en: 'Your Name',
    ru: 'Ваше имя',
    de: 'Ihr Name',
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
  [CHOOSE_FILE_LABEL]: {
    en: 'Choose Your photo',
    ru: 'Выберите Ваше фото',
    de: 'Wählen Sie Ihr Foto',
  },
  [CANCEL_BTN_LABEL]: {
    en: 'CANCEL',
    ru: 'ОТМЕНА',
    de: 'STORNIEREN',
  },
  [REGISTER_BTN_LABEL]: {
    en: 'REGISTER',
    ru: 'ЗАРЕГИСТРИРОВАТЬСЯ',
    de: 'REGISTRIEREN',
  },
  [CLOSE_BTN_LABEL]: {
    en: 'CLOSE',
    ru: 'ЗАКРЫТЬ',
    de: 'Schließen',
  },
};

const RegistrationForm = ({
  isOpen,
  onClose: handleClose,
  currentLanguage,
}: Props): JSX.Element => {
  const [registrationErrors, setRegistrationErrors] = useState<IRegistrationErrors>({
    general: null,
    login: null,
    name: null,
    password: null,
  });

  const [successMess, setSuccessfulMessage] = useState<string | null>(null);
  const [chosenFileName, setChosenFileName] = useState<string | null | undefined>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const loadHiddenTextFieldRef = useRef<HTMLInputElement>(null);

  const handleCloseDialog = () => {
    setRegistrationErrors({
      name: null,
      login: null,
      password: null,
      general: null,
    });
    setSuccessfulMessage(null);
    handleClose();
  };

  const handleRegisterUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setRegistrationErrors({
      name: null,
      login: null,
      password: null,
      general: null,
    });

    const formData = new FormData(formRef.current || undefined);

    try {
      const response = await fetch(`${api}/${USER_REGISTRATION_API}`, {
        method: 'POST',
        body: formData,
      });

      const body: IResponse = (await response.json()) as IResponse;

      if (response.status !== 201) {
        const errors: IRegistrationErrors = {
          general: body.message,
          login: null,
          name: null,
          password: null,
        };

        if (body.errors && body.errors.length) {
          for (let i = 0; i < body.errors.length; i += 1) {
            const err = body.errors[i];
            if (Object.keys(errors).includes(err.param)) {
              errors[err.param] = err.msg;
            }
          }
        }
        setRegistrationErrors({ ...registrationErrors, ...errors });
      } else {
        setSuccessfulMessage(SUCCESSFUL_REGISTRATION_MESSAGE[currentLanguage]);
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        setRegistrationErrors({
          ...registrationErrors,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          general: String(error.message),
        });
      }
    }
  };

  const handleFileNameChange = () => {
    if (loadHiddenTextFieldRef && loadHiddenTextFieldRef.current) {
      setChosenFileName(loadHiddenTextFieldRef.current.value);
    }
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      className="animate__animated animate__fadeInDownBig"
      fullWidth
      maxWidth="sm"
      onClose={handleCloseDialog}
      open={isOpen}
    >
      {!successMess ? (
        <>
          <DialogTitle id="form-dialog-title">
            {Translations[SIGN_UP_LABEL][currentLanguage]}
          </DialogTitle>
          <DialogContent>
            {registrationErrors.general && (
              <Typography className="animate__animated animate__bounceIn" gutterBottom>
                {registrationErrors.general}
              </Typography>
            )}
            <form
              ref={formRef}
              encType="muplipart/form-data"
              method="POST"
              onSubmit={handleRegisterUser}
            >
              <TextField
                autoFocus
                fullWidth
                id="name"
                label={Translations[USER_NAME_LABEL][currentLanguage]}
                margin="dense"
                name="name"
                type="text"
              />
              {registrationErrors.name && (
                <Typography
                  className="animate__animated animate__bounceInLeft"
                  gutterBottom
                >
                  {registrationErrors.name}
                </Typography>
              )}
              <TextField
                fullWidth
                id="login"
                label={Translations[LOGIN_LABEL][currentLanguage]}
                margin="dense"
                name="login"
                type="text"
              />
              {registrationErrors.login && (
                <Typography
                  className="animate__animated animate__bounceInLeft"
                  gutterBottom
                >
                  {registrationErrors.login}
                </Typography>
              )}
              <TextField
                fullWidth
                id="password"
                label={Translations[PASSWORD_LABEL][currentLanguage]}
                margin="dense"
                name="password"
                type="password"
              />
              {registrationErrors.password && (
                <Typography
                  className="animate__animated animate__bounceInLeft"
                  gutterBottom
                >
                  {registrationErrors.password}
                </Typography>
              )}
              <Button
                color="primary"
                onClick={() => {
                  if (loadHiddenTextFieldRef && loadHiddenTextFieldRef.current) {
                    loadHiddenTextFieldRef.current.click();
                  }
                }}
              >
                {Translations[CHOOSE_FILE_LABEL][currentLanguage]}
              </Button>
              <Typography>{chosenFileName}</Typography>
              <input
                ref={loadHiddenTextFieldRef}
                name="filedata"
                onChange={handleFileNameChange}
                style={{ display: 'none' }}
                type="file"
              />
              <DialogActions>
                <Button color="primary" onClick={handleCloseDialog}>
                  {Translations[CANCEL_BTN_LABEL][currentLanguage]}
                </Button>
                <Button color="primary" type="submit" variant="outlined">
                  {Translations[REGISTER_BTN_LABEL][currentLanguage]}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle id="form-dialog-title">{successMess}</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={handleCloseDialog} variant="outlined">
              {Translations[CLOSE_BTN_LABEL][currentLanguage]}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default RegistrationForm;
