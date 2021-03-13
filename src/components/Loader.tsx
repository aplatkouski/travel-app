import { makeStyles } from '@material-ui/core';
import loader from 'Assets/images/loader.gif';
import React from 'react';

const Loader = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <img alt="Loader" src={loader} />
    </div>
  );
};

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 146px)',
    '& img': {
      width: '5rem',
    },
  },
});

export default Loader;
