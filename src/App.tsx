import { createStyles, makeStyles } from '@material-ui/core/styles';
import Footer from 'Components/Footer';
import MainView from 'Components/MainView';
import React from 'react';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
  })
);

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainView />
      <Footer />
    </div>
  );
};

export default App;
