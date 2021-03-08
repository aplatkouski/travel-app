import { CssBaseline } from '@material-ui/core';
import {
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import MainView from 'Components/MainView';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from 'States/root-store';
import theme from './theme';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
});

type Props = WithStyles<typeof styles>;

const App = ({ classes }: Props): JSX.Element => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Header/>
          <Switch>
            <Route component={MainView} exact path="/" />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  </Provider>
);

export default withStyles(styles, { withTheme: true })(App);
