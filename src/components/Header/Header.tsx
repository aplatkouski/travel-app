import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LanguageSelector from 'Components/LanguageSelector';
import SearchField from 'Components/SearchField';
import UserCard from 'Components/UserCard';
import { Language } from 'Entities/travel-app';
import { IUser } from 'Entities/user';
import clouds from 'Images/illustration-clouds.png';
import plane from 'Images/illustration-plane.png';
import logo from 'Images/logo.png';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import * as StateTypes from 'States/types';
import user from 'States/user';
import getDictionary from './i18n/translate';

interface Props {
  currentLanguage: Language;
  currentUser: IUser | undefined;
  logOut: () => void;
  onOpenLogInForm: () => void;
  onOpenRegistrationForm: () => void;
}

const Header = (props: Props): JSX.Element => {
  const {
    currentLanguage,
    currentUser,
    logOut: handleLogOut,
    onOpenLogInForm: handleOpenLogInForm,
    onOpenRegistrationForm: handleOpenRegistrationForm,
  } = props;
  const classes = useStyles();
  const { pathname } = useLocation();

  const d = getDictionary(currentLanguage);

  return (
    <Grid className={classes.header} container>
      <div className={classes.exp}>
        <div className={classes.exp1}>
          <img alt="clouds" className={classes.cloudsImg} src={clouds} />
          <Link to="/travel-app/">
            <img alt="logo" className={classes.logo} src={logo} />
          </Link>
          <img alt="plane" className={classes.planeImg} src={plane} />
        </div>
      </div>

      <Grid item xs={2}>
        <LanguageSelector />
      </Grid>

      <Grid
        className={classes.buttonsContainer}
        container
        direction="column"
        item
        justify="space-between"
        xs={10}
      >
        <Grid container item justify="flex-end">
          {currentUser && currentUser.token ? (
            <>
              <UserCard />
              <Button
                className={classes.button}
                color="secondary"
                onClick={handleLogOut}
                variant="outlined"
              >
                {d.logOut}
              </Button>
            </>
          ) : (
            <>
              <Button
                className={classes.button}
                color="secondary"
                onClick={handleOpenRegistrationForm}
                variant="outlined"
              >
                {d.signUp}
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                onClick={handleOpenLogInForm}
                variant="outlined"
              >
                {d.logIn}
              </Button>
            </>
          )}
        </Grid>
        {pathname === '/travel-app/' && (
          <Grid container justify="flex-end">
            <SearchField />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: theme.palette.background.paper,
      boxShadow: `0 2px 2px -2px ${theme.palette.text.secondary}`,
      height: '7rem',
      padding: '.5rem 0 .5rem 1rem',
      position: 'relative',
    },
    exp: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    exp1: {
      position: 'absolute',
      display: 'flex',
      width: '73%',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row-reverse',
      },
    },
    cloudsImg: {
      maxWidth: theme.spacing(36),
      width: '40%',
      [theme.breakpoints.down('xs')]: {
        width: '60%',
      },
      objectFit: 'contain',
    },
    planeImg: {
      maxWidth: theme.spacing(36),
      width: '40%',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      objectFit: 'contain',
    },
    logo: {
      maxWidth: theme.spacing(14),
      objectFit: 'contain',
      transition: 'all 2s ease-in',
      '&:hover': {
        transform: 'rotate(360deg)',
        transition: 'all 2s ease-in',
        transformOrigin: '49% 58%',
      },
    },
    buttonsContainer: {
      height: '100%',
    },
    button: {
      color: theme.palette.text.primary,
      borderWith: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
      marginRight: '1rem',
    },
  })
);

const mapStateToProps = (state: StateTypes.RootState) => ({
  currentUser: state.user.current,
  currentLanguage: state.languageSelector.language,
});

const mapDispatchToProps = {
  logOut: user.actions.logOut,
  onOpenLogInForm: user.actions.openLogInForm,
  onOpenRegistrationForm: user.actions.openRegistrationForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
