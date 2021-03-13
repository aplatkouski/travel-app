// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { api, userRegAPI, successRegMess } from '../../constants';

import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

interface IErrResponse {
  message: string;
  errors: Array<{ param: string; msg: string }>;
}

interface IErrObj {
  generalErr: string | null | undefined;
  nameErr: string | null | undefined;
  loginErr: string | null | undefined;
  passwordErr: string | null | undefined;
}

const RegistrationForm = ({ open, onClose: handleCloseDlg }: Props): JSX.Element => {
  const [regErrs, setRegErrs] = useState<IErrObj>({
    nameErr: null,
    loginErr: null,
    passwordErr: null,
    generalErr: null,
  });

  const [successMess, setSuccessMess] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseDialog = () => {
    setRegErrs({
      nameErr: null,
      loginErr: null,
      passwordErr: null,
      generalErr: null,
    });
    setSuccessMess(null);
    handleCloseDlg();
  };

  const handleRegisterUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setRegErrs({
      nameErr: null,
      loginErr: null,
      passwordErr: null,
      generalErr: null,
    });

    const formData = new FormData(formRef.current || undefined);

    try {
      const resp = await fetch(`${api}/${userRegAPI}`, {
        method: 'POST',
        body: formData,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body: IErrResponse = await resp.json();

      if (resp.status !== 201) {
        const errObj: IErrObj = {
          generalErr: body.message,
          nameErr: null,
          loginErr: null,
          passwordErr: null,
        };

        if (body.errors && body.errors.length) {
          for (let i = 0; i < body.errors.length; i += 1) {
            const err = body.errors[i];
            switch (err.param) {
              case 'name':
                errObj.nameErr = err.msg;
                break;
              case 'login':
                errObj.loginErr = err.msg;
                break;
              case 'password':
                errObj.passwordErr = err.msg;
                break;
              default:
                break;
            }
          }
        }
        setRegErrs({ ...regErrs, ...errObj });
      } else {
        setSuccessMess(successRegMess);
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setRegErrs({ ...regErrs, generalErr: err.message });
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
        {!successMess ? (
          <>
            <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
            <DialogContent>
              {regErrs.generalErr && (
                <Typography gutterBottom>{regErrs.generalErr}</Typography>
              )}
              <DialogContentText>Please, enter Your registration data:</DialogContentText>
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
                {regErrs.nameErr && (
                  <Typography gutterBottom>{regErrs.nameErr}</Typography>
                )}
                <TextField
                  fullWidth
                  id="login"
                  label="Login"
                  margin="dense"
                  name="login"
                  type="text"
                />
                {regErrs.loginErr && (
                  <Typography gutterBottom>{regErrs.loginErr}</Typography>
                )}
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  margin="dense"
                  name="password"
                  type="password"
                />
                {regErrs.passwordErr && (
                  <Typography gutterBottom>{regErrs.passwordErr}</Typography>
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
                    Close
                  </Button>
                  <Button color="primary" type="submit">
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
              <Button color="primary" onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(RegistrationForm);
