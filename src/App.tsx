import { CssBaseline } from '@material-ui/core';
import {
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import CountryPage from 'Components/CountryPage';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import LogInForm from 'Components/LogInForm';
import MainPage from 'Components/MainPage';
import RegistrationForm from 'Components/RegistrationForm';
import { Language } from 'Entities/travel-app';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import countries from 'States/countries';
import * as StateTypes from 'States/types';
import user from 'States/user';
import theme from './theme';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
});

interface Props extends WithStyles<typeof styles> {
  fetchCountries: () => void;
  language: Language;
  logInWithLocalStorage: () => void;
}

const App = ({
  classes,
  fetchCountries,
  language,
  logInWithLocalStorage,
}: Props): JSX.Element => {
  useEffect(() => {
    fetchCountries();
    logInWithLocalStorage();
  }, [fetchCountries, language, logInWithLocalStorage]);

  return (<Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <Switch>
          <Route component={MainPage} exact path="/" />
          <Route component={CountryPage} path="/country/:id" />
        <Route component={CountryPage} path="/country/:id" />
          </Switch>
          <Footer />
          <RegistrationForm />
          <LogInForm />
        </div>
      </ThemeProvider>
    </Router>
  );
};

const mapStateToProps = (state: StateTypes.RootState) => ({
  language: state.languageSelector.language,
});

const mapDispatchToProps = {
  fetchCountries: countries.thunk.getCountriesThunk,
  logInWithLocalStorage: user.thunk.logInWithLocalStorageThunk,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
