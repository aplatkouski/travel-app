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
import MainPage from 'Components/MainPage';
import { useDispatch } from 'react-redux';
import countries from 'States/countries';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './theme';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
});

type Props = WithStyles<typeof styles>;

const App = ({ classes }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { fetchCountries } = countries.actions;

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch, fetchCountries]);

  return (<Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <Switch>
          <Route component={MainPage} exact path="/" />
          {/*todo path*/}
          <Route component={CountryPage} exact path="/country" />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  </Router>
);};

export default withStyles(styles, { withTheme: true })(App);
