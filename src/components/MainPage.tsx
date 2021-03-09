import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flexBasis: 'auto',
      flexGrow: 1,
      flexShrink: 0,
      maxWidth: theme.spacing(128),
      padding: theme.spacing(2, 2),
    },
  })
);
const MainPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container className={classes.main} component="main" maxWidth="sm">
      <h1>Hello world!</h1>
    </Container>
  );
};

export default MainPage;
