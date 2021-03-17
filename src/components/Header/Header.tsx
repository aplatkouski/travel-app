import { Button, Grid } from '@material-ui/core';
import clouds from 'Assets/images/illustration-clouds.png';
import plane from 'Assets/images/illustration-plane.png';
import logo from 'Assets/images/logo.png';
import LanguageSelector from 'Components/LanguageSelector';
import SearchField from 'Components/SearchField';
import UserCard from 'Components/UserCard';
import { Language } from 'Entities/travel-app';
import { IUser } from 'Entities/user';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import getDictionary from './i18n/translate';
import useStyles from './styles';

interface Props {
  currentLanguage: Language;
  currentUser: IUser | undefined;
  handleLogOut: () => void;
  handleOpenLogInForm: () => void;
  handleOpenRegistrationForm: () => void;
}

const Header = ({
  currentLanguage,
  currentUser,
  handleLogOut,
  handleOpenLogInForm,
  handleOpenRegistrationForm,
}: Props): JSX.Element => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const d = getDictionary(currentLanguage);

  return (
    <Grid className={classes.header} container>
      <div className={classes.exp}>
        <div className={classes.exp1}>
          <img alt="clouds" className={classes.cloudsImg} src={clouds} />
          <Link to="/">
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
                {d.logout}
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
                {d.signup}
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                onClick={handleOpenLogInForm}
                variant="outlined"
              >
                {d.login}
              </Button>
            </>
          )}
        </Grid>
        {pathname === '/' && (
          <Grid container justify="flex-end">
            <SearchField />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
