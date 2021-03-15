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

interface Props {
  logInErrors: ILogInErrors | undefined;
  isOpen: boolean;
  onClose: () => void;
  onLogIn: (credentials: ICredentials) => void;
}

const LogInForm = ({
  logInErrors,
  isOpen,
  onClose: handleClose,
  onLogIn,
}: Props): JSX.Element => {
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
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={isOpen}
      >
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          {logInErrors && logInErrors.general && (
            <Typography gutterBottom>{logInErrors.general}</Typography>
          )}
          <FormControl fullWidth>
            <InputLabel htmlFor="login">Log in</InputLabel>
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
              <Typography gutterBottom>{logInErrors.login}</Typography>
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
            {logInErrors && logInErrors.password && (
              <Typography gutterBottom>{logInErrors.password}</Typography>
            )}
          </FormControl>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleLogInUser}>
              Log in
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogInForm;
