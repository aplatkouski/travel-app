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
import {
  api,
  SUCCESSFUL_REGISTRATION_MESSAGE,
  USER_REGISTRATION_API,
} from '../../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
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

const RegistrationForm = ({ isOpen, onClose: handleClose }: Props): JSX.Element => {
  const [registrationErrors, setRegistrationErrors] = useState<IRegistrationErrors>({
    general: null,
    login: null,
    name: null,
    password: null,
  });

  const [successMess, setSuccessfulMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

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
        setSuccessfulMessage(SUCCESSFUL_REGISTRATION_MESSAGE);
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

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      onClose={handleCloseDialog}
      open={isOpen}
    >
      {!successMess ? (
        <>
          <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
          <DialogContent>
            {registrationErrors.general && (
              <Typography gutterBottom>{registrationErrors.general}</Typography>
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
                label="Your name"
                margin="dense"
                name="name"
                type="text"
              />
              {registrationErrors.name && (
                <Typography gutterBottom>{registrationErrors.name}</Typography>
              )}
              <TextField
                fullWidth
                id="login"
                label="Login"
                margin="dense"
                name="login"
                type="text"
              />
              {registrationErrors.login && (
                <Typography gutterBottom>{registrationErrors.login}</Typography>
              )}
              <TextField
                fullWidth
                id="password"
                label="Password"
                margin="dense"
                name="password"
                type="password"
              />
              {registrationErrors.password && (
                <Typography gutterBottom>{registrationErrors.password}</Typography>
              )}
              <TextField
                fullWidth
                id="file"
                label="Your photo"
                margin="dense"
                name="filedata"
                type="file"
              />
              <DialogActions>
                <Button color="primary" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" variant="outlined">
                  Register
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
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default RegistrationForm;
