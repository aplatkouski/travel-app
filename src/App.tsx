import {
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Footer from 'Components/Footer';
import MainView from 'Components/MainView';
import React from 'react';
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
  <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <MainView />
      <Footer />
    </div>
  </ThemeProvider>
);

export default withStyles(styles, { withTheme: true })(App);
